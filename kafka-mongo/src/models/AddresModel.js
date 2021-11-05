const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
  location: String,
  countrycode: Schema.Types.ObjectId,
  statecode: Schema.Types.ObjectId,
  citycode: Schema.Types.ObjectId,
  country: String,
  state: String,
  city: String,
  zip: String,
});

const addressSchema = new Schema({
  userid: { type: Schema.Types.ObjectId },
  addresses: [{ type: locationSchema }],
});

const Address = mongoose.model('Addresses', addressSchema);

module.exports = {
  Address,
};
