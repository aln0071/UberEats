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

async function getUserByEmail({ email }) {
  try {
    const user = await User.findOne({ email });
    if (user !== null) {
      // send success response
      return user;
    }
    throw new Error('User Not Found');
  } catch (error) {
    console.log(error);
    throw new CustomError(400, error.message);
  }
}

// handle login user
async function loginUser({ email, password }) {
  // process request
  console.log(password);
  try {
    const user = await User.findOne({ email });
    if (user !== null) {
      // send success response
      return user;
    }
    throw new Error('Invalid Credentials');
  } catch (error) {
    console.log(error);
    throw new CustomError(400, error.message);
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserByEmail,
};
