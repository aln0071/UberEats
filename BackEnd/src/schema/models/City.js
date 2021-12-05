const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'City',
  description: 'City type definition',
  fields: {
    city: { type: GraphQLString },
    citycode: { type: GraphQLString },
  },
});
