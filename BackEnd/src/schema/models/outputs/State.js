const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'State',
  description: 'State type definition',
  fields: {
    state: { type: GraphQLString },
    statecode: { type: GraphQLString },
    countrycode: { type: GraphQLString },
  },
});
