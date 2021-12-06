const { GraphQLString } = require('graphql');
const { updateOrder } = require('../../utils/endpoints');

module.exports = {
  type: GraphQLString,
  args: {
    type: { type: GraphQLString },
    orderid: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { orderid } = args;
    if (!orderid) throw new Error('Order id required');
    const response = await updateOrder(args);
    return response.message;
  },
};
