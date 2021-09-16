const { executeQuery } = require('./utils');
const { _login } = require('./queries');

function login(username, password) {
  return executeQuery(_login, { username, password })
    .then((response) => {
      if (response.length === 0) {
        return {
          status: false,
        };
      }
      return {
        status: true,
        userdata: response[0],
      };
    })
    .catch(() => ({
      status: false,
    }));
}

module.exports = { login };
