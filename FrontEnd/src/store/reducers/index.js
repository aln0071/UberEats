import { combineReducers } from 'redux';
import user from './user';
import dishes from './dishes';
import restaurants from './restaurants';
import currentTab from './currentTab';
import currentRestaurant from './currentRestaurant';
import cart from './cart';
import addresses from './addresses';
import orderConfirmModal from './orderConfirmModal';

export default combineReducers({
  user,
  dishes,
  restaurants,
  currentTab,
  currentRestaurant,
  cart,
  addresses,
  orderConfirmModal,
});
