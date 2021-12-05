const { GraphQLObjectType, GraphQLString } = require('graphql');

const User = new GraphQLObjectType({
  name: 'User',
  description: 'User type definition',
  fields: () => ({
    email: {
      type: GraphQLString,
    },
  }),
});

module.exports = User;
