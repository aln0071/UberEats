const { registerUser, loginUser } = require('../apis/users');
const types = require('./types');

function handleRequest(type, body) {
  switch (type) {
    case types.REGISTER_USER:
      return registerUser(body);
    case types.LOGIN_USER:
      return loginUser(body);
    default:
      return {};
  }
}

module.exports = handleRequest;
