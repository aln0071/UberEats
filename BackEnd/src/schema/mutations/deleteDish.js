const { GraphQLString } = require('graphql');
const { deleteDish } = require('../../utils/endpoints');

module.exports = {
  type: GraphQLString,
  args: {
    dishid: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    if (!args.dishid) throw new Error('Dish id required');
    await deleteDish(args.dishid);
    return 'Dish deleted successfully';
  },
};
