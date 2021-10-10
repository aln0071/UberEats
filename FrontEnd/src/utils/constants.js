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
  updateOrder: 'update-order',
  toggleFavorite: 'toggle-favorite',
  getFavorites: 'get-favorites',
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
  2: 'Delivery',
  3: 'Pickup',
};

export const deliveryStatus = {
  1: { label: 'Ordered', time: 'created' },
  2: { label: 'Preparing', time: 'preparing' },
  3: { label: 'On Way', time: 'onway' },
  4: { label: 'Delivered', time: 'delivered' },
  5: { label: 'Ready', time: 'ready' },
  6: { label: 'Picked Up', time: 'pickedup' },
  7: { label: 'Canceled', time: 'canceled' },
};
