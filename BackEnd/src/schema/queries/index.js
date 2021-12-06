const { GraphQLObjectType, GraphQLList } = require('graphql');
const User = require('../models/outputs/User');
const Login = require('./login');
const Dishes = require('./dishes');
const Countries = require('./countries');
const States = require('./states');
const Cities = require('./cities');
const Orders = require('./orders');

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
    Cities,
    Orders,
  },
});

module.exports = RootQuery;
