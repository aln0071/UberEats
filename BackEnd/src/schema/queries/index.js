const { GraphQLObjectType, GraphQLList } = require('graphql');
const User = require('../models/User');
const Login = require('./login');
const Dishes = require('./dishes');

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
    Dishes,
  },
});

module.exports = RootQuery;
