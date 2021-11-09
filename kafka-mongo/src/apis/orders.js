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
  created,
  status,
  name,
  instructions,
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
    created,
    status,
    name,
    items: Object.values(items).map((dish) => ({
      dishname: dish.dishname,
      price: dish.price,
      quantity: dish.count,
    })),
    instructions,
  });
  const response = await order.save();
  return response._id;
}

async function getOrdersForUser({ userid, deliverymode }) {
  if (deliverymode === undefined) {
    const orders = await Order.find({ userid });
    return orders;
  }
  const orders = await Order.find({ userid, deliverymode });
  return orders;
}

async function getOrdersForRestaurant({ restaurantid }) {
  const orders = await Order.find({ restaurantid });
  return orders;
}

async function updateOrder(body) {
  const { status, orderid, key } = body;
  await Order.findOneAndUpdate({ _id: orderid }, { status, [key]: body[key] });
  return {
    message: 'Updated successfully',
  };
}

module.exports = {
  placeOrder,
  getOrdersForUser,
  getOrdersForRestaurant,
  updateOrder,
};
