const { GraphQLObjectType } = require('graphql');
const addUser = require('./addUser');

module.exports = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addUser,
  },
});
