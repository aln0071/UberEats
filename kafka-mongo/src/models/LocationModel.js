const mongoose = require('mongoose');

const { Schema } = mongoose;

const countrySchema = new Schema({
  country: String,
});

const stateSchema = new Schema({
  state: String,
  countrycode: { type: mongoose.Types.ObjectId },
});

const citySchema = new Schema({
  city: String,
  statecode: { type: mongoose.Types.ObjectId },
});

const Country = mongoose.model('Countries', countrySchema);
const State = mongoose.model('States', stateSchema);
const City = mongoose.model('Cities', citySchema);

module.exports = {
  Country,
  State,
  City,
};
