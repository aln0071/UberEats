const CustomError = require('../errors');
const { Dish } = require('../models/DishModel');

async function getAllDishes({ restaurantid }) {
  if (restaurantid === undefined) {
    const result = await Dish.find({});
    return result;
  }
  const result = await Dish.find({ restaurantid });
  return result;
}

async function addDiahes(body) {
  try {
    const dish = new Dish(body);
    await dish.save();
    return {
      status: 200,
      message: 'Dish added successfully',
    };
  } catch (error) {
    throw new CustomError(500, error.message);
  }
}

module.exports = {
  getAllDishes,
  addDiahes,
};
