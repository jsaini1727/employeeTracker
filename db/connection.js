const mysql = require('mysql2');

// Create connectio to our sql database

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_tracker_db'
  });


  module.exports = connection;