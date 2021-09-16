const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config();

function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.SECRET, { expiresIn: '1h' });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    return res.setStatus(401);
  }

  console.log(token);
  console.log();

  jwt.verify(token, process.env.SECRET, (error, user) => {
    console.log(error);
    if (error) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
    return null;
  });
  return null;
}

function connectToMySQL() {
  const connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB,
    ssl: 'Amazon RDS',
  });

  connection.connect((err) => {
    if (err) {
      console.error(`Database connection failed: ${err.stack}`);
      return;
    }

    console.log('Connected to database.');
  });

  connection.end();
}

module.exports = { generateAccessToken, authMiddleware, connectToMySQL };
