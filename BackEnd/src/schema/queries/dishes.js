const { GraphQLList, GraphQLString } = require('graphql');
const { getAllDishes } = require('../../utils/endpoints');
const Dish = require('../models/outputs/Dish');

module.exports = {
  type: new GraphQLList(Dish),
  args: {
    restaurantid: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { restaurantid } = args;
    // if (!restaurantid) throw new Error('Restaurant id required');
    const dishes = await getAllDishes(restaurantid);
    return dishes;
  },
};
