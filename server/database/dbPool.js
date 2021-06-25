const mysql = require('mysql');
const { 
  DB_POOL_LIMIT, 
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE 
} = require('../config');
//exported instance of createpool so it works as a singleton due to module caching of node.js
module.exports = mysql.createPool({
  connectionLimit: DB_POOL_LIMIT,
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
});