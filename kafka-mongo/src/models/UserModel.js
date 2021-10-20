const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
  city: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
  address: { type: String, required: false },
  zip: { type: String, required: false },
});

const usersSchema = new Schema({
  userid: { type: String, required: true, default: mongoose.Types.ObjectId },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: locationSchema, default: {} },
  pictures: [String],
  nickname: { type: String, required: false },
  phone: { type: String, required: false },
  description: { type: String, required: false },
});

const userModel = mongoose.model('users', usersSchema);
module.exports = userModel;
