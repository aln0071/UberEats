import {
  SHOW_ORDER_CONFIRM_MODAL,
  HIDE_ORDER_CONFIRM_MODAL,
} from '../actions/types';

const initialState = {
  show: false,
  orderid: '',
};

const orderConfirmModal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ORDER_CONFIRM_MODAL:
      return {
        show: true,
        ...action.payload,
      };
    case HIDE_ORDER_CONFIRM_MODAL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default orderConfirmModal;
