// import user model
const CustomError = require('../errors');
const { User } = require('../models/UserModel');

// handle register user
async function registerUser(body) {
  // process request
  try {
    const userExists = await User.findOne({ email: body.email });
    if (userExists) {
      throw new Error('User already exists');
    }
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
    throw new CustomError(500, error.message);
  }
}

async function getUserByEmail({ email }) {
  try {
    const user = await User.findOne({ email }).populate('location');
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
