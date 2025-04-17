const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "<host name>",
  user: "<user name>",
  password: "<password>",
  database: "<database name>",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
