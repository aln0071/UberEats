const { getAllDishes } = require('../apis/dishes');
const types = require('./types');

function handleRequest(type, body) {
  switch (type) {
    case types.GET_ALL_DISHES:
      return getAllDishes(body);
    default:
      throw new Error('No matching type found');
  }
}

module.exports.handleRequest = handleRequest;
