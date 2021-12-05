const { GraphQLObjectType } = require('graphql');
const addUser = require('./addUser');
const register = require('./register');
const updateProfile = require('./updateProfile');

module.exports = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addUser,
    register,
    updateProfile,
  },
});
