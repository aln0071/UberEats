import { combineReducers } from 'redux';
import user from './user';
import dishes from './dishes';
import restaurants from './restaurants';
import currentTab from './currentTab';

export default combineReducers({
  user,
  dishes,
  restaurants,
  currentTab,
});
