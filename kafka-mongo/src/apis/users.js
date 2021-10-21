// import user model
const CustomError = require('../errors');
const User = require('../models/UserModel');

// handle register user
async function registerUser(body) {
  // process request
  try {
    const user = new User({
      ...body,
    });
    await user.save();
    // send success response
    return {
      status: 200,
      message: 'User added successfully',
    };
  } catch (error) {
    console.log(error);
    throw new CustomError(500, 'User creation failed');
  }
}

module.exports = {
  registerUser,
};
