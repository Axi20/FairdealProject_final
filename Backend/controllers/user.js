// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const mysql = require('mysql2');

// // Method to handle POST requests to the /users/sign-up URL path
// class UserController{
 
//   static async signUp(req, res) {

//     const dbConfig = {
//       host: 'localhost',
//       user: 'root',
//       password: 'mysql',
//       database: 'car_database'
//     };

//     // Connect to the database
//     const conn = mysql.createConnection(dbConfig);

//     async function validateSignUp(email) {
//       // Query the database to check if a sign-up with the same email already exists
//       const query = 'SELECT * FROM customers WHERE email = ?';
//       const [results] = await conn.promise().query(query, [email]);
//       return results.length > 0;
//     }

//     async function validateDrivingLicence(driving_licence) {
//       const driving_licence_regex = /^[A-Z]{2}\d{2}(\d{2}|\d{3})\d{2}$/;
//       if(driving_licence_regex.test(req.body.driving_licence)) {
//         res.send('Érvénytelen jogosítványszám formátum');
//         return true;
//       }
//     }

//   // Validate request data
//     if (!req.body.firstname || !req.body.lastname || !req.body.email 
//       || !req.body.phone_number || !req.body.driving_licence || !req.body.password ) {
//       return res.status(400).send({ error: 'Firstname, Lastname, Email, Mobile, Driving Licence number, and password are required!' });
//     }

//   //REGEX validations
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
//       return res.status(400).send({ error: 'Invalid email address' });
//     }
    
//     if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(req.body.password)) {
//       return res.status(400).send({ error: 'Password must be at least 8 characters long and contain lowercase, uppercase, and numeric characters' });
//     }

//   // Encrypt the password
//     const hash = bcrypt.hashSync(req.body.password, 10);

//   // Validate that the email is unique
//     const emailExists = await validateSignUp(req.body.email);
//     if (emailExists) {
//       return res.status(400).send({ error: 'Email already in use' });
//     }

//     const driving_licence_valid = await validateDrivingLicence(req.body.driving_licence);
//     if(!driving_licence_valid) {
//       return res.status(400).send({ error: 'Driving licence format invalid' });
//     }

//     const user = new User('id', req.body.firstname, req.body.lastname, req.body.email, req.body.phone_number, req.body.driving_licence, hash);
//     user.create((userId) => {
//       console.log(`Added user with ID ${userId} to the database`);
//         });
      
//   // Generate a response
//     res.status(201).send({ user: user });
//   }
// }

// module.exports = UserController;

const User = require('../models/User');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'car_database'
};

class UserController {
  static async signUp(req, res) {
    try {
      // Validate request data
      if (
        !req.body.firstname ||
        !req.body.lastname ||
        !req.body.email ||
        !req.body.phone_number ||
        !req.body.driving_licence ||
        !req.body.password
      ) {
        return res
          .status(400)
          .send({ error: 'Az összes mező kitöltése kötelező!' });
      }

      //REGEX validations
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        return res.status(400).send({ error: 'Invalid email address' });
      }

      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(req.body.password)) {
        return res
          .status(400)
          .send({ error: 'A jelszónak legalább 8 karakter hosszúnak kell lennie, és tartalmaznia kell kis-, nagy- és numerikus karaktereket!' });
      }

      // Encrypt the password
      const hash = await bcrypt.hash(req.body.password, 10);

      // Get a connection from the connection pool
      const connection = await mysql.createPool(dbConfig).getConnection();

      // Validate that the email is unique
      const [rows] = await connection.query('SELECT * FROM customers WHERE email = ?', [req.body.email]);
      if (rows.length > 0) {
        connection.release();
        return res.status(400).send({ error: 'Ezzel az email címmel már regisztráltak fiókot.' });
      }

      // Validate the driving license
      const drivingLicenseRegex = /^[A-Z]{2}\d{2}(\d{2}|\d{3})\d{2}$/;
      if (!drivingLicenseRegex.test(req.body.driving_licence)) {
        connection.release();
        return res.status(400).send({ error: 'Nem megfelelő jogosítványszám formátum!' });
      }

      const phoneNumberRegex = /^(?:\+36|06)(?:20|30|31|50|70)\d{7}$/;
      if(!phoneNumberRegex.test(req.body.phone_number)) {
        connection.release();
        return res.status(400).send({ error: 'Nem megfelelő telefonszám formátum!' });
      }

      const usernameRegex = /^[A-Z][a-z]*$/;
      if(!usernameRegex.test(req.body.firstname)) {
        connection.release();
        return res.status(400).send({ error: 'Nem megfelelő név formátum!' });
      }

      if(!usernameRegex.test(req.body.lastname)) {
        connection.release();
        return res.status(400).send({ error: 'Nem megfelelő név formátum!' });
      }

      // Create the user
      const user = new User(
        'id',
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.phone_number,
        req.body.driving_licence,
        hash
      );
      await user.create((userId) => {
        console.log(`Added user with ID ${userId} to the database`);
      });

      // Release the connection back to the pool
      connection.release();
        // Generate a response
        res.status(201).send({ user: user });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Internal server error' });
      }
    }
  }
  
  module.exports = UserController;