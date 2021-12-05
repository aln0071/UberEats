const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');
const { updateDish } = require('../../utils/endpoints');

module.exports = {
  type: GraphQLString,
  args: {
    dishid: { type: GraphQLString },
    dishname: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLInt },
    price: { type: GraphQLFloat },
    restaurantid: { type: GraphQLString },
    pictures: { type: new GraphQLList(GraphQLString) },
  },
  resolve: async (parent, args) => {
    if (!args.restaurantid) throw new Error('Restaurant id required');
    if (!args.dishid) throw new Error('Dish id required');
    await updateDish(args);
    return 'Dish updated successfully';
  },
};
