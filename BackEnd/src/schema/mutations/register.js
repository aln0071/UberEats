const { GraphQLString } = require('graphql');
const { register } = require('../../utils/endpoints');

module.exports = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    city: { type: GraphQLString },
    citycode: { type: GraphQLString },
    state: { type: GraphQLString },
    statecode: { type: GraphQLString },
    country: { type: GraphQLString },
    countrycode: { type: GraphQLString },
    location: { type: GraphQLString },
    zip: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    await register(args);
    return args.type === 'c'
      ? 'User registered successfully'
      : 'Restaurant registered successfully';
  },
};
