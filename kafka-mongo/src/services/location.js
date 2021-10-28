const { getCountries } = require('../apis/locations');
const types = require('./types');

function handleRequest(type) {
  switch (type) {
    case types.GET_COUNTRIES:
      return getCountries();
    default:
      throw new Error('No matching type found');
  }
}

module.exports.handleRequest = handleRequest;
