const { Country, State, City } = require('../models/LocationModel');

function mapIdToKey(data, id) {
  return data.map((row) => {
    const realRow = row.toObject();
    return {
      ...realRow,
      [id]: realRow._id,
      _id: undefined,
    };
  });
}

async function getCountries() {
  const countries = await Country.find({});
  return mapIdToKey(countries, 'countrycode');
}

async function getStates({ countrycode }) {
  if (countrycode === undefined) return mapIdToKey(await State.find({}), 'statecode');
  return mapIdToKey(await State.find({ countrycode }), 'statecode');
}

async function getCities({ statecode }) {
  if (statecode === undefined) return mapIdToKey(await City.find({}), 'citycode');
  return mapIdToKey(await City.find({ statecode }), 'citycode');
}

module.exports = {
  getCountries,
  getStates,
  getCities,
};
