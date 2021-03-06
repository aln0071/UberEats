const { GraphQLList } = require('graphql');
const Country = require('../models/outputs/Country');
const { getCountries } = require('../../utils/endpoints');

module.exports = {
  type: new GraphQLList(Country),
  resolve: async () => {
    const countries = await getCountries();
    return countries;
  },
};
