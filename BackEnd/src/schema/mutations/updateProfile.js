const { GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { updateProfile } = require('../../utils/endpoints');

module.exports = {
  type: GraphQLString,
  args: {
    userid: { type: GraphQLString },
    restaurantid: { type: GraphQLString },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    city: { type: GraphQLString },
    citycode: { type: GraphQLString },
    state: { type: GraphQLString },
    statecode: { type: GraphQLString },
    country: { type: GraphQLString },
    countrycode: { type: GraphQLString },
    location: { type: GraphQLString },
    zip: { type: GraphQLString },
    pictures: { type: new GraphQLList(GraphQLString) },
    nickname: { type: GraphQLString },
    phone: { type: GraphQLString },
    description: { type: GraphQLString },
    deliverymode: { type: GraphQLInt },
    hoursfrom: { type: GraphQLString },
    hoursto: { type: GraphQLString },
    dob: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    if (!args.userid) throw new Error('User id required');
    await updateProfile(args);
    return 'Profile updated successfully';
  },
};
