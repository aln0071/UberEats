import {
  SHOW_ORDER_DETAILS_MODAL,
  HIDE_ORDER_DETAILS_MODAL,
} from '../actions/types';

const initialState = {
  show: false,
  items: [],
};

const orderDetailsModal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ORDER_DETAILS_MODAL:
      return {
        show: true,
        ...action.payload,
      };
    case HIDE_ORDER_DETAILS_MODAL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default orderDetailsModal;
