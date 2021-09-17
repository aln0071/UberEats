const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DB,
  connectionLimit: process.env.RDS_POOL_SIZE,
  ssl: 'Amazon RDS',
});

module.exports = { pool };
