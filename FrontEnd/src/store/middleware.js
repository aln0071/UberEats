import { CLEAR_USER_DETAILS, SET_USER_DETAILS } from './actions/types';

/* eslint-disable */
const middleware = (store) => (next) => (action) => {
  if (action.type === SET_USER_DETAILS) {
    window.sessionStorage.setItem(
      "user",
      JSON.stringify({ ...store.getState("user").user, ...action.payload })
    );
  } else if (action.type === CLEAR_USER_DETAILS) {
    window.sessionStorage.removeItem("user");
  }
  next(action);
};

export default middleware;
