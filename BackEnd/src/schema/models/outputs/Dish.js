const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Dish',
  description: 'Dish type definition',
  fields: {
    dishid: { type: GraphQLString },
    dishname: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLInt },
    price: { type: GraphQLFloat },
    restaurantid: { type: GraphQLString },
    pictures: { type: new GraphQLList(GraphQLString) },
  },
});
