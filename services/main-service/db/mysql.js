// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  waitForConnections: true,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionLimit: parseInt(process.env.DB_CONN_LIMIT, 10),
  queueLimit: 0,
});

module.exports = pool;
