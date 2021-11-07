module.exports = {
  locationTopic: 'location_topic',
  locationSubTopics: {
    GET_COUNTRIES: 'GET_COUNTRIES',
    GET_STATES: 'GET_STATES',
    GET_CITIES: 'GET_CITIES',
  },
  userTopic: 'user_topic',
  userSubTopics: {
    GET_USER_BY_EMAIL: 'GET_USER_BY_EMAIL',
    UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE',
    ADD_FAVORITE: 'ADD_FAVORITE',
    REMOVE_FAVORITE: 'REMOVE_FAVORITE',
    GET_ALL_FAVORITES: 'GET_ALL_FAVORITES',
    PLACE_ORDER: 'PLACE_ORDER',
    GET_ALL_RELATED_ADDRESSES: 'GET_ALL_RELATED_ADDRESSES',
    GET_ALL_ORDERS: 'GET_ALL_ORDERS',
  },
  dishTopic: 'dish_topic',
  dishSubTopics: {
    ADD_DISH: 'ADD_DISH',
    GET_ALL_DISHES: 'GET_ALL_DISHES',
  },
  restaurantTopic: 'restaurant_topic',
  restaurantSubTopics: {
    GET_ALL_RESTAURANTS: 'GET_ALL_RESTAURANTS',
    GET_ALL_ORDERS: 'GET_ALL_ORDERS',
  },
};
