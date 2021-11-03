const { getAllDishes, addDiahes } = require('../apis/dishes');
const types = require('./types');

function handleRequest(type, body) {
  switch (type) {
    case types.GET_ALL_DISHES:
      return getAllDishes(body);
    case types.ADD_DISH:
      return addDiahes(body);
    default:
      throw new Error('No matching type found');
  }
}

module.exports.handleRequest = handleRequest;
