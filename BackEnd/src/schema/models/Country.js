const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Country',
  description: 'Country type definition',
  fields: {
    country: { type: GraphQLString },
    countrycode: { type: GraphQLString },
  },
});
