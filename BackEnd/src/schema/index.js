const { GraphQLSchema } = require('graphql');

const RootQuery = require('./queries');
const RootMutation = require('./mutations');

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;
