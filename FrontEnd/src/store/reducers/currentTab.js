import { SET_CURRENT_TAB } from '../actions/types';

const initialState = 0;

const currentTab = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TAB:
      return action.payload;
    default:
      return state;
  }
};

export default currentTab;
