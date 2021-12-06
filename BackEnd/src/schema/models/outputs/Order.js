const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt,
} = require('graphql');
const OrderItem = require('./OrderItem');

module.exports = new GraphQLObjectType({
  name: 'Order',
  description: 'Order type definition',
  fields: {
    canceled: { type: GraphQLString },
    city: { type: GraphQLString },
    citycode: { type: GraphQLString },
    created: { type: GraphQLString },
    deliveryfee: { type: GraphQLString },
    deliverymode: { type: GraphQLString },
    items: { type: new GraphQLList(OrderItem) },
    location: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    restaurantid: { type: GraphQLString },
    status: { type: GraphQLInt },
    tax: { type: GraphQLFloat },
    userid: { type: GraphQLString },
    zip: { type: GraphQLString },
    _id: { type: GraphQLString },
  },
});
