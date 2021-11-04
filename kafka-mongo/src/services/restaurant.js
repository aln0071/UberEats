const { getAllRestaurants } = require('../apis/restaurant');
const types = require('./types');

function handleRequest(type, body) {
  switch (type) {
    case types.GET_ALL_RESTAURANTS:
      return getAllRestaurants(body);
    default:
      throw new Error('No matching type found');
  }
}

module.exports.handleRequest = handleRequest;
