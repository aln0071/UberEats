export const baseUrl = 'http://localhost:3001/';
export const urls = {
  login: 'login',
  auth: 'auth',
  register: 'register',
  countries: 'countries',
  states: 'states',
  cities: 'cities',
  updateProfile: 'update-profile',
  updateDishes: 'update-dishes',
  addDish: 'add-dish',
  getDishes: 'get-dishes',
  getAllRestaurants: 'get-restaurants',
  uploadImage: 'images',
  uploadsFolder: 'uploads',
  getAllRelatedAddresses: 'related-addresses',
  placeOrder: 'place-order',
  getOrderList: 'get-orders',
  getOrderDetails: 'get-orderdetails',
};

export const dishCategories = [
  {
    id: 1,
    label: 'Veg',
  },
  {
    id: 2,
    label: 'Non-Veg',
  },
  {
    id: 3,
    label: 'Vegan',
  },
];

export const deliveryModes = {
  1: 'Delivery',
  2: 'Pickup',
};

export const deliveryStatus = {
  1: { label: 'Ordered', time: 'created' },
  2: { label: 'Picked Up', time: 'pickedup' },
  3: { label: 'Delivered', time: 'delivered' },
  4: { label: 'Canceled', time: 'canceled' },
};
