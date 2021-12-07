const { GraphQLString } = require('graphql');
const { getRestaurant } = require('../../utils/endpoints');
const User = require('../models/outputs/User');

module.exports = {
  type: User,
  args: {
    restaurantid: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const restaurant = await getRestaurant(args);
    return restaurant;
  },
};
