const CustomError = require('../errors');
const { Dish } = require('../models/DishModel');

async function getAllDishes({ restaurantid }) {
  let result = [];
  if (restaurantid === undefined || restaurantid === '') {
    result = await Dish.find({});
  } else {
    result = await Dish.find({ restaurantid });
  }
  return result.map((dish) => ({ ...dish.toObject(), dishid: dish._id }));
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
