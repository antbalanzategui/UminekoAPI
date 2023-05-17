require('dotenv').config({ path: './server/.env' });
const mysql = require('mysql');

// Creates a pool for the SQL database
// We will use this one connection to handle all of our Database Querying
const pool = mysql.createPool({
  connectionLimit: 10,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE
});

module.exports = pool;