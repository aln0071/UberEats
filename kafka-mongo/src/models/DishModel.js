const mongoose = require('mongoose');

const { Schema } = mongoose;

const dishSchema = new Schema({
  restaurantid: { type: mongoose.Types.ObjectId, required: true },
  dishname: { type: String, required: true },
  description: String,
  category: { type: Number, required: true },
  price: { type: Number, required: true },
  pictures: Array,
});

const Dish = mongoose.model('Dishes', dishSchema);

module.exports = {
  Dish,
};
