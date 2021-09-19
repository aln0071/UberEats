import { SET_USER_DETAILS } from './actions/types';

/* eslint-disable */
const middleware = (store) => (next) => (action) => {
  if (action.type === SET_USER_DETAILS) {
    window.sessionStorage.setItem("user", JSON.stringify(action.payload));
  }
  next(action);
};

export default middleware;
