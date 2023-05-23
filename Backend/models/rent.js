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

// create the model for the "rent" table
const Rent = {
  // get a list of all rents
  index(callback) {
    connection.query(
      'SELECT * FROM rents',
      (error, results) => {
        if (error) callback(error);
        else callback(null, results);
      }
    );
  },

  // get a single rent by id
  show(id, callback) {
    connection.query(
      'SELECT * FROM rents WHERE rent_id = ?',
      id,
      (error, results) => {
        if (error) callback(error);
        else callback(null, results[0]);
      }
    );
  },

  // create a new rent
  create(data, callback) {
    connection.query(
      'INSERT INTO rents SET ?',
      data,
      (error, results) => {
        if (error) callback(error);
        else callback(null, results);
      }
    );
  },

  // update an existing rent
  update(id, data, callback) {
    connection.query(
      'UPDATE rents SET ? WHERE rent_id = ?',
      [data, id],
      (error, results) => {
        if (error) callback(error);
        else callback(null, results);
      }
    );
  },

  // delete a rent
  destroy(id, callback) {
    connection.query(
      'DELETE FROM rents WHERE rent_id = ?',
      id,
      (error, results) => {
        if (error) callback(error);
        else callback(null, results);
      }
    );
  }
};

module.exports = Rent;