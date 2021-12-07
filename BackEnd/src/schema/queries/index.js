const { GraphQLObjectType } = require('graphql');
const Login = require('./login');
const Dishes = require('./dishes');
const Countries = require('./countries');
const States = require('./states');
const Cities = require('./cities');
const Orders = require('./orders');
const Addresses = require('./addresses');
const Restaurants = require('./restaurants');
const Restaurant = require('./restaurant');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    Login,
    Dishes,
    Countries,
    States,
    Cities,
    Orders,
    Addresses,
    Restaurants,
    Restaurant,
  },
});

module.exports = RootQuery;
