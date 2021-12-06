const { GraphQLObjectType } = require('graphql');
const addUser = require('./addUser');
const register = require('./register');
const updateProfile = require('./updateProfile');
const addDish = require('./addDish');
const updateDish = require('./updateDish');
const placeOrder = require('./placeOrder');
const updateOrder = require('./updateOrder');

module.exports = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addUser,
    register,
    updateProfile,
    addDish,
    updateDish,
    placeOrder,
    updateOrder,
  },
});
