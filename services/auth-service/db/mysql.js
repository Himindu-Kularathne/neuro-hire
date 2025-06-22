const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  // waitForConnections: true,
  // ssl: {
  //   rejectUnauthorized: false
  // },
  // connectionLimit: parseInt(process.env.DB_CONN_LIMIT, 10),
  // queueLimit: 0
});

module.exports = pool;
