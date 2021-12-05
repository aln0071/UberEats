const { GraphQLObjectType, GraphQLList } = require('graphql');
const User = require('../models/User');

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
  },
});

module.exports = RootQuery;
