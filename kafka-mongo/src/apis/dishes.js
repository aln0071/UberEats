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

async function updateDish(dish) {
  await Dish.findOneAndUpdate({ _id: dish.dishid }, { ...dish });
  return {
    message: 'Dish updated successfully',
  };
}

async function deleteDish({ dishid }) {
  await Dish.findOneAndRemove({ _id: dishid });
  return {
    message: 'Successfully deleted dish',
  };
}

module.exports = {
  getAllDishes,
  addDiahes,
  updateDish,
  deleteDish,
};
