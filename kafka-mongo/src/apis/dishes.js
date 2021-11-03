const { Dish } = require('../models/DishModel');

async function getAllDishes({ restaurantid }) {
  if (restaurantid === undefined) {
    const result = await Dish.find({});
    return result;
  }
  const result = await Dish.find({ restaurantid });
  return result;
}

module.exports = {
  getAllDishes,
};
