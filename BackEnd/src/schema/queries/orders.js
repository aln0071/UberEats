const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
} = require('graphql');
const { getOrderList } = require('../../utils/endpoints');
const Order = require('../models/outputs/Order');

module.exports = {
  type: new GraphQLObjectType({
    name: 'OrderList',
    fields: {
      count: { type: GraphQLInt },
      orders: { type: new GraphQLList(Order) },
    },
  }),
  args: {
    userid: { type: GraphQLString },
    type: { type: GraphQLString },
    index: { type: GraphQLInt },
    offset: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    const {
      userid, type, index, offset,
    } = args;
    const orders = await getOrderList(userid, type, index, offset);
    return orders;
  },
};
