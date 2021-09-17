const { executeQuery } = require('./utils');
const { _login } = require('./queries');

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

module.exports = { login };
