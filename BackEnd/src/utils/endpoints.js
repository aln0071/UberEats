const bcrypt = require('bcrypt');
const { executeQuery } = require('./utils');
const { _login, _registerUser } = require('./queries');

function login(username, password) {
  return executeQuery(_login, { email: username }).then(async (response) => {
    if (response.length === 0) {
      throw new Error('Invalid credentials');
    } else {
      const userData = response[0];
      const isValidUser = await bcrypt.compare(password, userData.password);
      if (isValidUser) {
        delete userData.password;
        return userData;
      }
      throw new Error('Invalid credentials');
    }
  });
}

async function register(params) {
  const {
    email, password, type, name,
  } = params;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (type === 'customer') {
    return executeQuery(_registerUser, {
      email,
      password: hashedPassword,
      name,
    }).catch((error) => {
      if (String(error.message).startsWith('ER_DUP_ENTRY')) {
        throw new Error('User with this email already exists');
      } else {
        throw error;
      }
    });
  }
  return null;
}

module.exports = { login, register };
