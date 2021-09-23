const bcrypt = require('bcrypt');
const { executeQuery } = require('./utils');
const {
  _login,
  _register,
  _getCountries,
  _getStates,
  _getCities,
  _addLocation,
  _updateLocationInUserTable,
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

function getCountries() {
  return executeQuery(_getCountries);
}

function getStates(countrycode) {
  return executeQuery(_getStates, { countrycode });
}

function getCities(statecode) {
  return executeQuery(_getCities, { statecode });
}

module.exports = {
  login,
  register,
  getCountries,
  getStates,
  getCities,
};
