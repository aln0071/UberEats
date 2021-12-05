// make db call which is already written
// call login(username, password) of utils/endpoints
const { GraphQLString } = require('graphql');
const { login } = require('../../utils/endpoints');
const { generateAccessToken } = require('../../utils/utils');
const User = require('../models/outputs/User');

module.exports = {
  type: User,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { username, password } = args;
    const userDetails = await login(username, password);
    const token = generateAccessToken(username);
    return {
      ...userDetails,
      token: `Bearer ${token}`,
    };
  },
};
