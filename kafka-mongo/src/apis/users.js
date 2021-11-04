// import user model
const CustomError = require('../errors');
const { Favorite } = require('../models/FavoriteModel');
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
    // const user = await User.findOne({ email }).populate('location');
    const user = await User.findOne({ email });
    if (user !== null) {
      // send success response
      const response = { ...user.toObject(), userid: user._id };
      if (user.type === 'r') {
        response.restaurantid = user._id;
      }
      return response;
    }
    throw new Error('User Not Found');
  } catch (error) {
    console.log(error);
    throw new CustomError(400, error.message);
  }
}

async function updateUserProfile(params) {
  const existingUser = await User.findOne({ email: params.email });
  if (existingUser !== null && !existingUser._id.equals(params._id)) {
    throw new Error('Email already in use');
  }
  await User.findOneAndUpdate({ _id: params._id }, params);
  return {
    message: 'Data updated successfully',
  };
}

async function addFavorite({ userid, restaurantid }) {
  await Favorite.findOneAndUpdate(
    { userid },
    { $push: { favorites: restaurantid } },
    { upsert: true },
  );
  return {
    message: 'Successfully added favorite',
  };
}

async function removeFavorite({ userid, restaurantid }) {
  await Favorite.updateOne({ userid }, { $pull: { favorites: restaurantid } });
  return {
    message: 'Removed favorite',
  };
}

async function getAllFavorites({ userid }) {
  const result = await Favorite.findOne({ userid });
  return (result && result.favorites) || [];
}

module.exports = {
  registerUser,
  getUserByEmail,
  updateUserProfile,
  addFavorite,
  removeFavorite,
  getAllFavorites,
};
