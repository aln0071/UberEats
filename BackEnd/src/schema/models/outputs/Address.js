const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Address',
  description: 'Address type definition',
  fields: {
    city: { type: GraphQLString },
    citycode: { type: GraphQLString },
    location: { type: GraphQLString },
    zip: { type: GraphQLString },
  },
});
