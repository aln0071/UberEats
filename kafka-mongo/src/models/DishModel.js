const mongoose = require('mongoose');

const { Schema } = mongoose;

const dishSchema = new Schema({
  restaurantid: { type: mongoose.Types.ObjectId },
  dishname: String,
  description: String,
  category: Number,
  price: Number,
  pictures: Array,
});

const Dish = mongoose.model('Countries', dishSchema);

module.exports = {
  Dish,
};
