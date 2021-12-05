const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLInputObjectType,
} = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'OrderItem',
  description: 'Order item type definition',
  fields: {
    dishname: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
  },
});
