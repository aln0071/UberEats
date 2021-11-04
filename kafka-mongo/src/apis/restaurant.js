const { User } = require('../models/UserModel');

async function getAllRestaurants({ countrycode }) {
  let result = [];
  if (countrycode === undefined || countrycode === '') {
    result = await User.find({ type: 'r' });
  } else {
    result = await User.find({ type: 'r', countrycode });
  }
  return result.map((restaurant) => ({
    ...restaurant.toObject(),
    userid: restaurant._id,
    restaurantid: restaurant._id,
  }));
}

module.exports = {
  getAllRestaurants,
};
