const {
  registerUser,
  loginUser,
  getUserByEmail,
  getLocation,
  updateUserProfile,
} = require('../apis/users');
const types = require('./types');

function handleRequest(type, body) {
  switch (type) {
    case types.REGISTER_USER:
      return registerUser(body);
    case types.LOGIN_USER:
      return loginUser(body);
    case types.GET_USER_BY_EMAIL:
      return getUserByEmail(body);
    case types.GET_LOCATION:
      return getLocation();
    case types.UPDATE_USER_PROFILE:
      return updateUserProfile(body);
    default:
      return {};
  }
}

module.exports.handleRequest = handleRequest;
