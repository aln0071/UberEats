const bcrypt = require('bcrypt');
const {
  executeQuery,
  paramsToQuery,
  optionalFields,
  optionalConditions,
} = require('./utils');
const {
  _login,
  _register,
  _getCountries,
  _getStates,
  _getCities,
  _addLocation,
  _updateLocationInUserTable,
  _getAllStates,
  _getAllCities,
  _updateProfile,
  _findUserWithEmail,
  _getLocation,
  _addDishQuery,
  _getAllDishes,
  _getAllRestaurants,
  _getAllRestaurantsByCity,
} = require('./queries');

function login(username, password) {
  return executeQuery(_login, { email: username }).then(async (response) => {
    if (response.length === 0) {
      throw new Error('Invalid credentials');
    } else {
      const userData = response[0];
      const isValidUser = await bcrypt.compare(password, userData.password);
      if (isValidUser) {
        delete userData.password;
        return userData;
      }
      throw new Error('Invalid credentials');
    }
  });
}

async function register(params) {
  const {
    email, password, type, name,
  } = params;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return executeQuery(_register, {
    email,
    password: hashedPassword,
    name,
    type,
  })
    .then((response) => {
      if (type === 'r') {
        const userid = response.insertId;
        const { citycode, location, zip } = params;
        return executeQuery(_addLocation, { citycode, location, zip }).then(
          (res) => {
            const locationid = res.insertId;
            return executeQuery(_updateLocationInUserTable, {
              userid,
              locationid,
            });
          },
        );
      }
      return response;
    })
    .catch((error) => {
      if (String(error.message).startsWith('ER_DUP_ENTRY')) {
        throw new Error('User with this email already exists');
      } else {
        throw error;
      }
    });
}

async function updateProfile(params) {
  const {
    email, name, phone, nickname, dob, location, citycode, zip, userid,
  } = params;
  const updateQuery = _updateProfile.replace(
    ':optionalfields',
    paramsToQuery({
      email,
      name,
      phone,
      nickname,
      dob,
    }),
  );
  executeQuery(updateQuery, params);
  const locationData = await executeQuery(_getLocation, {
    location,
    citycode,
    zip,
  });
  if (locationData.length !== 0) {
    // use existing data
    const { locationid } = locationData[0];
    await executeQuery(_updateLocationInUserTable, { locationid, userid });
  } else {
    // add new entry to locaion table
    const response = await executeQuery(_addLocation, {
      location,
      citycode,
      zip,
    });
    const locationid = response.insertId;
    await executeQuery(_updateLocationInUserTable, { locationid, userid });
  }
}

function getCountries() {
  return executeQuery(_getCountries);
}

function getStates(countrycode) {
  console.error(countrycode);
  if (countrycode === undefined) {
    return executeQuery(_getAllStates);
  }
  return executeQuery(_getStates, { countrycode });
}

function getCities(statecode) {
  if (statecode === undefined) {
    return executeQuery(_getAllCities);
  }
  return executeQuery(_getCities, { statecode });
}

function updateDish(dish) {}

function addDish(dish) {
  const {
    restaurantid, dishname, description, category, price,
  } = dish;
  const values = {
    restaurantid,
    dishname,
    description,
    category,
    price,
  };
  const query = _addDishQuery
    .replace(':optionalfields', optionalFields(values))
    .replace(':optionalvalues', optionalFields(values, ':'));
  console.log(query);
  return executeQuery(query, values);
}

function getAllDishes(restaurantid) {
  return executeQuery(_getAllDishes, { restaurantid });
}

function getAllRestaurants({ citycode, statecode }) {
  // return executeQuery(
  //   _getAllRestaurants+` ${optionalConditions(
  //     {'c.citycode': citycode})}`, {'c.citycode': citycode});
  if ([undefined, null, ''].includes(citycode)) {
    return executeQuery(_getAllRestaurants);
  }
  return executeQuery(_getAllRestaurantsByCity, { citycode, statecode });
}

/* eslint no-unused-vars: 0 */
function findUserWithEmail(email) {
  return executeQuery(_findUserWithEmail, { email });
}

module.exports = {
  login,
  register,
  getCountries,
  getStates,
  getCities,
  updateProfile,
  addDish,
  getAllDishes,
  getAllRestaurants,
  findUserWithEmail,
};
