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