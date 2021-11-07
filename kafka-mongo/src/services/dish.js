const {
  getAllDishes,
  addDiahes,
  updateDish,
  deleteDish,
} = require('../apis/dishes');
const types = require('./types');

function handleRequest(type, body) {
  switch (type) {
    case types.GET_ALL_DISHES:
      return getAllDishes(body);
    case types.ADD_DISH:
      return addDiahes(body);
    case types.UPDATE_DISH:
      return updateDish(body);
    case types.DELETE_DISH:
      return deleteDish(body);
    default:
      throw new Error('No matching type found');
  }
}

module.exports.handleRequest = handleRequest;
