const bcrypt = require('bcrypt');
const mysql = require('mysql');
const {
  executeQuery,
  paramsToQuery,
  optionalFields,
  getCurrentDateTime,
  // optionalConditions,
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
  _updateRestaurantDetails,
  _addRestaurantDetails,
  _getAllRelatedAddresses,
  _placeOrder,
  _addRelatedAddress,
  _addOrderDetails,
  _getOrderList,
  _getOrderDetails,
  _getOrderListOfRestaurant,
  _getOrderDetailsOfRestaurant,
  _updateOrders,
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

        return Promise.all([
          executeQuery(_addLocation, { citycode, location, zip }).then(
            (res) => {
              const locationid = res.insertId;
              return executeQuery(_updateLocationInUserTable, {
                userid,
                locationid,
              });
            },
          ),
          executeQuery(_addRestaurantDetails, { restaurantid: userid }),
        ]);
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
    email,
    name,
    phone,
    nickname,
    dob,
    location,
    citycode,
    zip,
    userid,
    pictures,
    description,
  } = params;
  const values = {
    name,
    email,
    phone,
    nickname,
    dob,
    pictures,
    description,
  };
  const updateQuery = _updateProfile.replace(
    ':optionalfields',
    paramsToQuery(values),
  );
  executeQuery(updateQuery, { ...values, userid });
  const locationValues = { location, citycode, zip };
  const locationData = await executeQuery(_getLocation, locationValues);
  if (locationData.length !== 0) {
    // use existing data
    const { locationid } = locationData[0];
    await executeQuery(_updateLocationInUserTable, { locationid, userid });
  } else {
    // add new entry to locaion table
    const response = await executeQuery(_addLocation, locationValues);
    const locationid = response.insertId;
    await executeQuery(_updateLocationInUserTable, { locationid, userid });
  }
  // set hours from, hours to, and mode of delivery if restaurant
  if (params.type === 'r') {
    const { hoursfrom, hoursto, deliverymode } = params;
    const val = {
      hoursfrom,
      hoursto,
      deliverymode,
    };
    const query = _updateRestaurantDetails.replace(
      ':optionalfields',
      paramsToQuery(val),
    );
    console.log(query);
    await executeQuery(query, { ...val, restaurantid: userid });
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
    restaurantid, dishname, description, category, price, pictures,
  } = dish;
  const values = {
    restaurantid,
    dishname,
    description,
    category,
    price,
    pictures,
  };
  const query = _addDishQuery
    .replace(':optionalfields', optionalFields(values))
    .replace(':optionalvalues', optionalFields(values, ':'));
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

function getAllRelatedAddresses(userid) {
  return executeQuery(_getAllRelatedAddresses, { userid });
}

function getOrderList(userid, type = 'c') {
  if (type === 'r') {
    return Promise.all([
      executeQuery(_getOrderListOfRestaurant, { restaurantid: userid }),
      executeQuery(_getOrderDetailsOfRestaurant, { restaurantid: userid }),
    ]);
  }
  return Promise.all([
    executeQuery(_getOrderList, { userid }),
    executeQuery(_getOrderDetails, { userid }),
  ]);
}

async function placeOrder({
  locationid,
  location,
  zip,
  citycode,
  restaurantid,
  userid,
  items,
  price,
  deliverymode,
}) {
  if (deliverymode === 1) {
    if ([undefined, null, ''].includes(locationid)) {
      // create location or use existing location
      const locationData = await executeQuery(_getLocation, {
        citycode,
        location,
        zip,
      });
      if (locationData.length !== 0) {
        // use existing data
        locationid = locationData[0].locationid;
      } else {
        const response = await executeQuery(_addLocation, {
          citycode,
          location,
          zip,
        });
        locationid = response.insertId;
        executeQuery(_addRelatedAddress, { userid, locationid });
      }
    }
  }

  const response = await executeQuery(_placeOrder, {
    userid,
    restaurantid,
    price,
    locationid,
    created: getCurrentDateTime(),
    deliverymode,
  });
  const orderid = response.insertId;
  const queryValues = Object.values(items).reduce((t, c) => {
    if (t === '') {
      return `(${orderid}, ${mysql.escape(c.dishid)}, ${mysql.escape(
        c.count,
      )})`;
    }
    return `${t}, (${orderid}, ${mysql.escape(c.dishid)}, ${mysql.escape(
      c.count,
    )})`;
  }, '');
  const query = _addOrderDetails.replace(':fields', queryValues);
  await executeQuery(query);
  return orderid;
}

function updateOrder({ type, orderid }) {
  let query = '';
  let values = {};
  switch (type) {
    case 'cancel':
      values = { status: 7, canceled: getCurrentDateTime() };
      query = _updateOrders.replace(':optionalfields', paramsToQuery(values));
      break;
    default:
      return {
        message: 'Invalid update type',
      };
  }
  return executeQuery(query, { ...values, orderid });
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
  getAllRelatedAddresses,
  placeOrder,
  getOrderList,
  updateOrder,
};
