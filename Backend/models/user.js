const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Connection details for the MySQL database
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'car_database'
};

// Connect to the database
const conn = mysql.createConnection(dbConfig);
conn.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + conn.threadId);
});

// Define a User model class
class User {
  constructor(customer_id, firstname, lastname, email, phone_number, driving_licence, password) {
    this.id = customer_id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone_number = phone_number;
    this.driving_licence = driving_licence;
    this.password = password;
  }

  static validateSignUp(email, callback) {
    // Query the database to check if a sign-up with the same email already exists
    const query = 'SELECT * FROM customers WHERE email = ?';
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error querying database: ' + err.stack);
        return callback(err);
      }
  
      // If a sign-up with the same email already exists, call the callback with a truthy value
      if (results.length > 0) {
        callback(null, true);
      } else {
        // If a sign-up with the same email does not exist, call the callback with a falsy value
        callback(null, false);
      }
    });
  }

  // Method to create a new user record in the database
  create(callback) {
    const sql = 'INSERT INTO customers (firstname, lastname, email, phone_number, driving_licence, password) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [this.firstname, this.lastname, this.email, this.phone_number, this.driving_licence, this.password];
    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error executing INSERT: ' + err.stack);
        return;
      }
      callback(result.insertId);
    });
  }

  // Method to retrieve a user record from the database by email
  findByEmail(email, callback) {
    const sql = 'SELECT * FROM customers WHERE email = ?';
    const values = [email];
    conn.query(sql, values, (err, rows) => {
      if (err) {
        console.error('Error executing SELECT: ' + err.stack);
        return;
      }
      callback(rows[0]);
    });
  }

  // Method to retrieve a user record from the database by id
  findById(id, callback) {
    const sql = 'SELECT * FROM customers WHERE customer_id = ?';
    const values = [id];
    conn.query(sql, values, (err, rows) => {
      if (err) {
        console.error('Error executing SELECT: ' + err.stack);
        return;
      }
     callback(rows[0]);
    });
  }

  static authenticate = (email, password, callback) => {
    const sql = `SELECT * FROM customers WHERE email = ?`;
  
    // Execute the query
    conn.query(sql, [email], (error, results) => {
      if (error || !results.length) {
        return callback(error);
      }
  
      const user = results[0];
  
      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, (error, result) => {
        if (error || !result) {
          return callback(error);
        }
  
        return callback(null, user);
      });
    });
  };
}

module.exports = User;
