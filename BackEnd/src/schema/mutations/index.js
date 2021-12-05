const { GraphQLObjectType } = require('graphql');
const addUser = require('./addUser');
const register = require('./register');

module.exports = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addUser,
    register,
  },
});
