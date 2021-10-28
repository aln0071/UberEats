import { CLEAR_REGISTER_ERRORS, SET_REGISTER_ERRORS } from '../actions/types';

const initialState = {};

const registerErrors = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER_ERRORS:
      return { ...action.payload };
    case CLEAR_REGISTER_ERRORS:
      return {};
    default:
      return state;
  }
};

export default registerErrors;
