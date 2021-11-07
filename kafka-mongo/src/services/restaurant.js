const { getOrdersForRestaurant } = require('../apis/orders');
const { getAllRestaurants } = require('../apis/restaurant');
const types = require('./types');

function handleRequest(type, body) {
  switch (type) {
    case types.GET_ALL_RESTAURANTS:
      return getAllRestaurants(body);
    case types.GET_ALL_ORDERS:
      return getOrdersForRestaurant(body);
    default:
      throw new Error('No matching type found');
  }
}

module.exports.handleRequest = handleRequest;
