const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');
const OrderItem = require('../models/inputs/OrderItem');
const { placeOrder } = require('../../utils/endpoints');

module.exports = {
  type: GraphQLString,
  args: {
    zip: { type: GraphQLString },
    customername: { type: GraphQLString },
    customeremail: { type: GraphQLString },
    customerphone: { type: GraphQLString },
    location: { type: GraphQLString },
    citycode: { type: GraphQLString },
    city: { type: GraphQLString },
    userid: { type: GraphQLString },
    restaurantid: { type: GraphQLString },
    price: { type: GraphQLFloat },
    deliverymode: { type: GraphQLInt },
    tax: { type: GraphQLFloat },
    deliveryfee: { type: GraphQLFloat },
    name: { type: GraphQLString },
    instructions: { type: GraphQLString },
    items: { type: new GraphQLList(OrderItem) },
  },
  resolve: async (parent, args) => {
    const orderid = await placeOrder(args);
    return orderid;
  },
};
