/* eslint max-len: 0 */
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const kafka = require('../kafka/client');
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
  _addFavorite,
  _removeFavorite,
  _getFavorites,
  _getAllRestaurantsByCountry,
  _getAllDishesFromAllRestaurants,
  _updateDishQuery,
} = require('./queries');
const kafkaRequest = require('../kafka/request');
const {
  locationTopic,
  locationSubTopics,
  userTopic,
  userSubTopics,
  dishTopic,
  dishSubTopics,
  restaurantTopic,
  restaurantSubTopics,
} = require('./topicTypes');

async function login(username, password) {
  const user = await kafkaRequest(userTopic, userSubTopics.GET_USER_BY_EMAIL, {
    email: username,
  });
  if (user.error) {
    throw new Error(user.error);
  } else {
    const isValidUser = await bcrypt.compare(password, user.password);
    if (isValidUser) {
      delete user.password;
      return user;
    }
    throw new Error('Invalid credentials');
  }
}

async function register(params) {
  const { password } = params;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return kafkaRequest('user_topic', 'REGISTER_USER', {
    ...params,
    password: hashedPassword,
  });
  // return kafka.make_request(
  //   'user_topic',
  //   'REGISTER_USER',
  //   params,
  //   (err, result) => {
  //     console.log('inside kafka');
  //     if (err) {
  //       console.log(err);
  //       return {
  //         message: 'Failed',
  //       };
  //     }
  //     console.log(result);
  //     return result;
  //   },
  // );

  // const {
  //   email, password, type, name,
  // } = params;

  // const saltRounds = 10;
  // const hashedPassword = await bcrypt.hash(password, saltRounds);

  // return executeQuery(_register, {
  //   email,
  //   password: hashedPassword,
  //   name,
  //   type,
  // })
  //   .then((response) => {
  //     if (type === 'r') {
  //       const userid = response.insertId;
  //       const { citycode, location, zip } = params;

  //       return Promise.all([
  //         executeQuery(_addLocation, { citycode, location, zip }).then(
  //           (res) => {
  //             const locationid = res.insertId;
  //             return executeQuery(_updateLocationInUserTable, {
  //               userid,
  //               locationid,
  //             });
  //           },
  //         ),
  //         executeQuery(_addRestaurantDetails, { restaurantid: userid }),
  //       ]);
  //     }
  //     return response;
  //   })
  //   .catch((error) => {
  //     if (String(error.message).startsWith('ER_DUP_ENTRY')) {
  //       throw new Error('User with this email already exists');
  //     } else {
  //       throw error;
  //     }
  //   });
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
    city,
    statecode,
    state,
    countrycode,
    country,
    zip,
    userid,
    pictures,
    description,
    hoursfrom,
    hoursto,
    deliverymode,
    _id,
  } = params;

  return kafkaRequest(userTopic, userSubTopics.UPDATE_USER_PROFILE, {
    email,
    name,
    phone,
    nickname,
    dob,
    location,
    citycode,
    city,
    statecode,
    state,
    countrycode,
    country,
    zip,
    userid,
    pictures,
    description,
    hoursfrom,
    hoursto,
    deliverymode,
    _id,
  });

  // const result = {};
  // const {
  //   email,
  //   name,
  //   phone,
  //   nickname,
  //   dob,
  //   location,
  //   citycode,
  //   zip,
  //   userid,
  //   pictures,
  //   description,
  // } = params;
  // const values = {
  //   name,
  //   email,
  //   phone,
  //   nickname,
  //   dob,
  //   pictures,
  //   description,
  // };
  // result.pictures = pictures;
  // const updateQuery = _updateProfile.replace(
  //   ':optionalfields',
  //   paramsToQuery(values),
  // );
  // executeQuery(updateQuery, { ...values, userid });
  // const locationValues = { location, citycode, zip };
  // const locationData = await executeQuery(_getLocation, locationValues);
  // if (locationData.length !== 0) {
  //   // use existing data
  //   const { locationid } = locationData[0];
  //   await executeQuery(_updateLocationInUserTable, { locationid, userid });
  //   result.locationid = locationid;
  // } else {
  //   // add new entry to locaion table
  //   const response = await executeQuery(_addLocation, locationValues);
  //   const locationid = response.insertId;
  //   await executeQuery(_updateLocationInUserTable, { locationid, userid });
  //   result.locationid = locationid;
  // }
  // // set hours from, hours to, and mode of delivery if restaurant
  // if (params.type === 'r') {
  //   const { hoursfrom, hoursto, deliverymode } = params;
  //   const val = {
  //     hoursfrom,
  //     hoursto,
  //     deliverymode,
  //   };
  //   const query = _updateRestaurantDetails.replace(
  //     ':optionalfields',
  //     paramsToQuery(val),
  //   );
  //   console.log(query);
  //   await executeQuery(query, { ...val, restaurantid: userid });
  // }
  // return result;
}

function getCountries() {
  return kafkaRequest(locationTopic, locationSubTopics.GET_COUNTRIES, {});
}

function getStates(countrycode) {
  return kafkaRequest(locationTopic, locationSubTopics.GET_STATES, {
    countrycode,
  });
}

function getCities(statecode) {
  return kafkaRequest(locationTopic, locationSubTopics.GET_CITIES, {
    statecode,
  });
}

function updateDish(dish) {
  const {
    restaurantid,
    dishname,
    description,
    category,
    price,
    pictures,
    dishid,
  } = dish;
  const values = {
    restaurantid,
    dishname,
    description,
    category,
    price,
    pictures,
  };
  const query = _updateDishQuery.replace(
    ':optionalfields',
    paramsToQuery(values),
  );
  return executeQuery(query, { ...values, dishid });
}

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

  return kafkaRequest(dishTopic, dishSubTopics.ADD_DISH, values);

  // const query = _addDishQuery
  //   .replace(':optionalfields', optionalFields(values))
  //   .replace(':optionalvalues', optionalFields(values, ':'));
  // return executeQuery(query, values);
}

function getAllDishes(restaurantid) {
  return kafkaRequest(dishTopic, dishSubTopics.GET_ALL_DISHES, {
    restaurantid,
  });
  // if ([undefined, null, ''].includes(restaurantid)) return executeQuery(_getAllDishesFromAllRestaurants);
  // return executeQuery(_getAllDishes, { restaurantid });
}

function getAllRestaurants({ citycode, statecode, countrycode }) {
  // return executeQuery(
  //   _getAllRestaurants+` ${optionalConditions(
  //     {'c.citycode': citycode})}`, {'c.citycode': citycode});

  // if ([undefined, null, ''].includes(citycode)) {
  //   return executeQuery(_getAllRestaurants);
  // }
  // return executeQuery(_getAllRestaurantsByCity, { citycode, statecode });
  return kafkaRequest(
    restaurantTopic,
    restaurantSubTopics.GET_ALL_RESTAURANTS,
    { countrycode },
  );
  // if ([undefined, null, ''].includes(countrycode)) return executeQuery(_getAllRestaurants);
  // return executeQuery(_getAllRestaurantsByCountry, { countrycode });
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
  tax,
  deliveryfee,
}) {
  if (deliverymode === 2) {
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
    price: parseFloat(price).toFixed(2),
    locationid,
    created: getCurrentDateTime(),
    deliverymode,
    tax: parseFloat(tax).toFixed(2),
    deliveryfee: parseFloat(deliveryfee).toFixed(2),
  });
  const orderid = response.insertId;
  const queryValues = Object.values(items).reduce((t, c) => {
    if (t === '') {
      return `(${orderid}, ${mysql.escape(c.dishid)}, ${mysql.escape(
        c.count,
      )}, ${(parseInt(c.count, 10) * parseFloat(c.price)).toFixed(2)} )`;
    }
    return `${t}, (${orderid}, ${mysql.escape(c.dishid)}, ${mysql.escape(
      c.count,
    )}, ${(parseInt(c.count, 10) * parseFloat(c.price)).toFixed(2)} )`;
  }, '');
  const query = _addOrderDetails.replace(':fields', queryValues);
  await executeQuery(query);
  return orderid;
}

function updateOrder({ type, orderid }) {
  const statuses = {
    preparing: 2,
    onway: 3,
    delivered: 4,
    ready: 5,
    pickedup: 6,
    canceled: 7,
  };
  if (statuses[type] === undefined) {
    return {
      message: 'Invalid update type',
    };
  }
  const values = {
    [type]: getCurrentDateTime(),
    status: statuses[type],
  };
  const query = _updateOrders.replace(':optionalfields', paramsToQuery(values));
  return executeQuery(query, { ...values, orderid });
}

function toggleFavorite({ userid, restaurantid, isFavorite }) {
  if (isFavorite) {
    return executeQuery(_addFavorite, { userid, restaurantid });
  }
  return executeQuery(_removeFavorite, { userid, restaurantid });
}

function getFavorites(userid) {
  return executeQuery(_getFavorites, { userid });
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
  toggleFavorite,
  getFavorites,
  updateDish,
};
