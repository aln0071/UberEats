const { GraphQLObjectType, GraphQLList } = require('graphql');
const User = require('../models/User');
const Login = require('./login');

const userdb = [
  {
    email: 'test',
  },
];

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    Users: {
      type: new GraphQLList(User),
      resolve: () => userdb,
    },
    Login,
  },
});

module.exports = RootQuery;
