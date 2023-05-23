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

// create the model for the "rentplace" table
const Rentplace = {
  // get a list of all data
index(callback) {
  connection.query(
    'SELECT * FROM rentplace',
    (error, results) => {
      if (error) {
        console.error('Error in query:', error);
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
      'SELECT * FROM rentplace WHERE id = ?',
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
      'INSERT INTO rentplace SET ?',
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
      'UPDATE rentplace SET ? WHERE id = ?',
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
      'DELETE FROM rentplace WHERE id = ?',
      id,
      (error, results) => {
        if (error) callback(error);
        else callback(null, results);
      }
    );
  }
};

module.exports = Rentplace;