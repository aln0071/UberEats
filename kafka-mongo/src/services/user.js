const { registerUser, loginUser, getUserByEmail } = require('../apis/users');
const types = require('./types');

function handleRequest(type, body) {
  // callback(null, {hello: 'world'})
  // return;
  switch (type) {
    case types.REGISTER_USER:
      return registerUser(body);
    case types.LOGIN_USER:
      return loginUser(body);
    case types.GET_USER_BY_EMAIL:
      return getUserByEmail(body);
    default:
      return {};
  }
}

module.exports.handleRequest = handleRequest;
