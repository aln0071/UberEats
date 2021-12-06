const { GraphQLList, GraphQLString } = require('graphql');
const { getAllRelatedAddresses } = require('../../utils/endpoints');
const Address = require('../models/outputs/Address');

module.exports = {
  type: new GraphQLList(Address),
  args: {
    userid: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const { userid } = args;
    if (!userid) throw new Error('User id required');
    const relatedAddresses = await getAllRelatedAddresses(userid);
    return relatedAddresses;
  },
};
