const bcrypt = require('bcrypt');
const { executeQuery, paramsToQuery } = require('./utils');
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

function updateProfile(params) {
  // const { email, name, citycode, locationid, location, zip, phone, nickname, dob } = params;
  const {
    email, name, phone, nickname, dob,
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
  return executeQuery(updateQuery, params);
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
};
