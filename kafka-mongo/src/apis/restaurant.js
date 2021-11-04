const { User } = require('../models/UserModel');

async function getAllRestaurants({ countrycode }) {
  console.log(countrycode);
  if (countrycode === undefined || countrycode === '') {
    const result = await User.find({ type: 'r' });
    return result;
  }
  const result = await User.find({ type: 'r', countrycode });
  return result;
}

module.exports = {
  getAllRestaurants,
};
