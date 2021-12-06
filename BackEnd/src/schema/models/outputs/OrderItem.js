const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLObjectType,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'OutputOrderItem',
  description: 'Order item type definition',
  fields: {
    dishname: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
  },
});
