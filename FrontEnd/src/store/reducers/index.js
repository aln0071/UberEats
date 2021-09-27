import { combineReducers } from 'redux';
import user from './user';
import dishes from './dishes';

export default combineReducers({
  user,
  dishes,
});
