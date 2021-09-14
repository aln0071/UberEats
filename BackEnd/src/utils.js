const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

export default function generateAccessToken(username) {
  return jwt.sign(username, process.env.SECRET, { expiresIn: '1800s' });
}
