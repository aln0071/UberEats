const { Order } = require('../models/OrderModel');

async function placeOrder({
  items,
  restaurantid,
  userid,
  price,
  tax,
  deliveryfee,
  deliverymode,
  location,
  zip,
  citycode,
  city,
}) {
  const order = new Order({
    restaurantid,
    userid,
    price,
    tax,
    deliveryfee,
    deliverymode,
    location,
    zip,
    citycode,
    city,
    items: Object.values(items).map((dish) => ({
      dishname: dish.dishname,
      price: dish.price,
      quantity: dish.count,
    })),
  });
  const response = await order.save();
  return response._id;
}

module.exports = {
  placeOrder,
};
