const jwt = require('jsonwebtoken');
const User = require('../models/User')
const mysql2 = require('mysql2');
require("dotenv").config();

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'car_database'
  };

  // Connect to the database
const conn = mysql2.createConnection(dbConfig);

async function Userlogin(req, res) {
    const { email, password } = req.body;
  
    const query = 'SELECT customer_id FROM customers WHERE email = ?';
    conn.query(query, [email], (error, results) => {
      if(error){
        console.log(error);
      }
      else {
        const db_user = results[0];
        // const userID = db_user._id;
        const userID = db_user.customer_id;

         // Authenticate the user
        User.authenticate(email, password, (error, user) => {
        if (error || !user) {
          return res.status(401).json({
          message: 'Authentication failed'
          });
        }
        // Generate a JWT and send it back to the client
        const token = jwt.sign({ _id: userID, iat: Date.now()}, process.env.JWT_KEY);
        // const token = jwt.sign({ customer_id: userID, iat: Date.now()}, process.env.JWT_KEY);

        expiresIn: '1h' // expires in one hour
        return res.json({ token });
        });
      }
    })
  };

module.exports = Userlogin;

