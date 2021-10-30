const { getCountries, getStates, getCities } = require('../apis/locations');
const types = require('./types');

function handleRequest(type, body) {
  switch (type) {
    case types.GET_COUNTRIES:
      return getCountries();
    case types.GET_STATES:
      return getStates(body);
    case types.GET_CITIES:
      return getCities(body);
    default:
      throw new Error('No matching type found');
  }
}

module.exports.handleRequest = handleRequest;
