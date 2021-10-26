const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
  city: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
  location: { type: String, required: false },
  zip: { type: String, required: false },
});

const locSchema = new Schema({
  city: { type: mongoose.Types.ObjectId },
  location: String,
  zip: String,
});

const citySchema = new Schema({
  city: String,
});

const usersSchema = new Schema({
  userid: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: Schema.Types.ObjectId, ref: 'Location' },
  pictures: [String],
  nickname: { type: String, required: false },
  phone: { type: String, required: false },
  description: { type: String, required: false },
});

const User = mongoose.model('User', usersSchema);
const Location = mongoose.model('Location', locSchema);
module.exports = {
  User,
  Location,
  locationSchema,
  citySchema,
};
