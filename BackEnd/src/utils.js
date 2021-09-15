const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

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

module.exports = { generateAccessToken, authMiddleware };
