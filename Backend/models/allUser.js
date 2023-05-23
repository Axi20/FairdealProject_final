const mysql = require('mysql2');

// create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'car_database'
});

// test the connection
connection.connect(error => {
  if (error) console.error('Error connecting to the database:', error.stack);
  else console.log('Connected to the database.');
});

// create the model for the "opening_days" table
const Customers = {
  // get a list of all data
index(callback) {
  connection.query(
    'SELECT * FROM customers',
    (error, results) => {
      if (error) {
        console.log('Error in query:', error);
        callback(error);
      }
      else {
        console.log('Query results:', results);
        callback(null, results);
      }
    }
  );
},


  // get a single data by id
  show(id, callback) {
    connection.query(
      'SELECT * FROM customers WHERE customer_id = ?',
      id,
      (error, results) => {
        if (error) callback(error);
        else callback(null, results[0]);
      }
    );
  },

  // create new data
  create(data, callback) {
    connection.query(
      'INSERT INTO customers SET ?',
      data,
      (error, results) => {
        if (error) callback(error);
        else callback(null, results);
      }
    );
  },

  // update an existing data
  update(id, data, callback) {
    connection.query(
      'UPDATE customers SET ? WHERE customer_id = ?',
      [data, id],
      (error, results) => {
        if (error) callback(error);
        else callback(null, results);
      }
    );
  },

  // delete data
  destroy(id, callback) {
    connection.query(
      'DELETE FROM customers WHERE customer_id = ?',
      id,
      (error, results) => {
        if (error) callback(error);
        else callback(null, results);
      }
    );
  }
};

module.exports = Customers;