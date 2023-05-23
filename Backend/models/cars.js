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

// create the model for the "cars" table
const Car = {
  // get a list of all cars
  index(callback) {
    connection.query(
      'SELECT * FROM cars WHERE rented = 0',
      (error, results) => {
        if (error) callback(error);
        else callback(null, results);
      }
    );
  },

  indexCar(callback) {
    connection.query(
      'SELECT * FROM cars',
      (error, results) => {
        if (error) callback(error);
        else callback(null, results);
      }
    );
  },

  // get a single car by id
  show(id, callback) {
    connection.query(
      'SELECT * FROM cars WHERE car_id = ? AND rented = 0',
      id,
      (error, results) => {
        if (error) callback(error);
        else callback(null, results[0]);
      }
    );
  },

  // create a new car
  create(data, callback) {
    connection.query(
      'INSERT INTO cars SET ?',
      data,
      (error, results) => {
        if (error) callback(error);
        else callback(null, results);
      }
    );
  },

  // update an existing car
  update(id, data, callback) {
    connection.query(
      'UPDATE cars SET ? WHERE car_id = ?',
      [data, id],
      (error, results) => {
        if (error) callback(error);
        else callback(null, results);
      }
    );
  },

  // delete a car
  destroy(id, callback) {
    connection.query(
      'DELETE FROM cars WHERE car_id = ?',
      id,
      (error, results) => {
        if (error) callback(error);
        else callback(null, results);
      }
    );
  }
};

module.exports = Car;