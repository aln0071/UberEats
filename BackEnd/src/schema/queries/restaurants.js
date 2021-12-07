const { GraphQLList, GraphQLString } = require('graphql');
const User = require('../models/outputs/User');
const { getAllRestaurants } = require('../../utils/endpoints');

module.exports = {
  type: new GraphQLList(User),
  args: {
    citycode: { type: GraphQLString },
    statecode: { type: GraphQLString },
    countrycode: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const restaurants = await getAllRestaurants(args);
    return restaurants;
  },
};
