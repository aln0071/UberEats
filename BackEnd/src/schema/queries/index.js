const { GraphQLObjectType, GraphQLList } = require('graphql');
const User = require('../models/User');
const Login = require('./login');
const Dishes = require('./dishes');
const Countries = require('./countries');
const States = require('./states');

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
    Countries,
    States,
  },
});

module.exports = RootQuery;
