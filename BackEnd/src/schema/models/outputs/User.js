const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'User type definition',
  fields: () => ({
    email: {
      type: GraphQLString,
    },
    token: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
    city: {
      type: GraphQLString,
    },
    state: {
      type: GraphQLString,
    },
    country: {
      type: GraphQLString,
    },
    location: {
      type: GraphQLString,
    },
    zip: {
      type: GraphQLString,
    },
    pictures: {
      type: new GraphQLList(GraphQLString),
    },
    nickname: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    citycode: {
      type: GraphQLString,
    },
    statecode: {
      type: GraphQLString,
    },
    countrycode: {
      type: GraphQLString,
    },
    deliverymode: {
      type: GraphQLInt,
    },
    userid: {
      type: GraphQLString,
    },
  }),
});
