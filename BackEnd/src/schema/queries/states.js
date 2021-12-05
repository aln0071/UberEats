const { GraphQLList, GraphQLString } = require('graphql');
const { getStates } = require('../../utils/endpoints');
const State = require('../models/outputs/State');

module.exports = {
  type: new GraphQLList(State),
  args: {
    countrycode: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { countrycode } = args;
    const states = await getStates(countrycode);
    return states;
  },
};
