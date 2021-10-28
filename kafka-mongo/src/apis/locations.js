const { Country } = require('../models/LocationModel');

async function getCountries() {
  const countries = await Country.find({});
  return countries.map((country) => ({
    country: country.country,
    countrycode: country._id,
  }));
}

module.exports = {
  getCountries,
};
