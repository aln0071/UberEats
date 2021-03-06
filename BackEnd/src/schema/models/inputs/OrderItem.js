const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLInputObjectType,
} = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'InputOrderItem',
  description: 'Order item type definition',
  fields: {
    dishname: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
  },
});
