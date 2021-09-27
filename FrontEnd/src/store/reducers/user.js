import { CLEAR_USER_DETAILS, SET_USER_DETAILS } from '../actions/types';

const initialState = JSON.parse(window.sessionStorage.getItem('user')) || {};

const user = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_USER_DETAILS:
      return {};
    default:
      return state;
  }
};

export default user;
