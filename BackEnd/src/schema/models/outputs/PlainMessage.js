const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'response',
  fields: {
    message: {
      type: GraphQLString,
    },
  },
});
