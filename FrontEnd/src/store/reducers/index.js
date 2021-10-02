import { combineReducers } from 'redux';
import user from './user';
import dishes from './dishes';
import message from './message';

export default combineReducers({
  user,
  dishes,
  message,
});
