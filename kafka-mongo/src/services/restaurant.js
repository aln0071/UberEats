const { getOrdersForRestaurant, updateOrder } = require('../apis/orders');
const { getAllRestaurants, getRestaurant } = require('../apis/restaurant');
const types = require('./types');

function handleRequest(type, body) {
  switch (type) {
    case types.GET_ALL_RESTAURANTS:
      return getAllRestaurants(body);
    case types.GET_RESTAURANT:
      return getRestaurant(body);
    case types.GET_ALL_ORDERS:
      return getOrdersForRestaurant(body);
    case types.UPDATE_ORDER:
      return updateOrder(body);
    default:
      throw new Error('No matching type found');
  }
}

module.exports.handleRequest = handleRequest;
