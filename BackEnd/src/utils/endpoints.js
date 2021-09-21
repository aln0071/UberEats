const { executeQuery } = require('./utils');
const { _login, _registerUser } = require('./queries');

function login(username, password) {
  return executeQuery(_login, { username, password }).then((response) => {
    if (response.length === 0) {
      throw new Error('Invalid credentials');
    }
    return {
      userdata: response[0],
    };
  });
}

function register(params) {
  const {
    email, password, type, name,
  } = params;
  if (type === 'customer') {
    return executeQuery(_registerUser, { email, password, name }).catch(
      (error) => {
        if (String(error.message).startsWith('ER_DUP_ENTRY')) {
          throw new Error('User with this email already exists');
        }
      },
    );
  }
  return null;
}

module.exports = { login, register };
