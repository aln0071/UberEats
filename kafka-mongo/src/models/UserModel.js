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
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  // location: { type: Schema.Types.ObjectId, ref: 'Location' },
  citycode: { type: Schema.Types.ObjectId },
  statecode: { type: Schema.Types.ObjectId },
  countrycode: { type: Schema.Types.ObjectId },
  city: { type: String, required: false, default: '' },
  state: { type: String, required: false, default: '' },
  country: { type: String, required: false, default: '' },
  location: { type: String, required: false, default: '' },
  zip: { type: String, required: false, default: '' },
  pictures: [String],
  nickname: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  description: { type: String, required: false, default: '' },
});

const User = mongoose.model('User', usersSchema);
const Location = mongoose.model('Location', locSchema);
module.exports = {
  User,
  Location,
  locationSchema,
  citySchema,
};
