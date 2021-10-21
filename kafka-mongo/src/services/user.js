const { registerUser } = require('../apis/users');
const types = require('./types');

function handleRequest(type, body) {
  switch (type) {
    case types.REGISTER_USER:
      return registerUser(body);
    default:
      return {};
  }
}

module.exports = handleRequest;
