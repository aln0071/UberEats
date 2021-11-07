const mongoose = require('mongoose');

const { Schema } = mongoose;

const dishSchema = new Schema({
  dishname: String,
  quantity: Number,
  price: Number,
});

const orderSchema = new Schema({
  restaurantid: { type: Schema.Types.ObjectId },
  name: String,
  userid: { type: Schema.Types.ObjectId },
  status: Number,
  created: String,
  pickedup: String,
  delivered: String,
  canceled: String,
  preparing: String,
  onway: String,
  ready: String,
  price: Number,
  deliverymode: Number,
  deliveryfee: Number,
  tax: Number,
  items: [{ type: dishSchema }],
  location: String,
  zip: String,
  citycode: Schema.Types.ObjectId,
  city: String,
});

const Order = mongoose.model('Orders', orderSchema);

module.exports = {
  Order,
};
