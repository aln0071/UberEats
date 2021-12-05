const { GraphQLString, GraphQLList } = require('graphql');
const User = require('../models/User');

const userdb = [
  {
    email: 'alan',
  },
  {
    email: 'diana',
  },
];

module.exports = {
  type: new GraphQLList(User),
  args: {
    email: { type: GraphQLString },
  },
  resolve: (parent, args) => {
    const { email } = args;
    userdb.push({ email });
    return userdb;
  },
};
