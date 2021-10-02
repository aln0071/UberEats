import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types';

const initialState = {};

const message = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, ...action.payload };
    case CLEAR_MESSAGE:
      return { ...initialState };
    default:
      return state;
  }
};

export default message;
