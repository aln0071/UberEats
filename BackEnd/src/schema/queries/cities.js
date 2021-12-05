const { GraphQLList, GraphQLString } = require('graphql');
const { getCities } = require('../../utils/endpoints');
const City = require('../models/City');

module.exports = {
  type: new GraphQLList(City),
  args: {
    statecode: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { statecode } = args;
    const cities = await getCities(statecode);
    return cities;
  },
};
