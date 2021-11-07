const { placeOrder, getOrdersForUser } = require('../apis/orders');
const {
  registerUser,
  loginUser,
  getUserByEmail,
  getLocation,
  updateUserProfile,
  addFavorite,
  removeFavorite,
  getAllFavorites,
  getAllAddresses,
} = require('../apis/users');
const { GET_ALL_RELATED_ADDRESSES, GET_ALL_ORDERS } = require('./types');
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
    case types.ADD_FAVORITE:
      return addFavorite(body);
    case types.REMOVE_FAVORITE:
      return removeFavorite(body);
    case types.GET_ALL_FAVORITES:
      return getAllFavorites(body);
    case types.PLACE_ORDER:
      return placeOrder(body);
    case GET_ALL_RELATED_ADDRESSES:
      return getAllAddresses(body);
    case GET_ALL_ORDERS:
      return getOrdersForUser(body);
    default:
      throw new Error('No matching type found');
  }
}

module.exports.handleRequest = handleRequest;
