import {
  HIDE_ADD_DISH_MODAL,
  SHOW_ADD_DISH_MODAL,
  UPDATE_DISH_DATA_IN_MODAL,
} from '../actions/types';

const initialState = {
  show: false,
  data: {
    dishid: '',
    dishname: '',
    description: '',
    category: [{ id: 1, label: 'Veg' }],
    price: 1,
  },
};

function addDishModal(state = initialState, action) {
  switch (action.type) {
    case SHOW_ADD_DISH_MODAL:
      return {
        ...state,
        show: true,
      };
    case UPDATE_DISH_DATA_IN_MODAL:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };
    case HIDE_ADD_DISH_MODAL:
      return initialState;
    default:
      return state;
  }
}

export default addDishModal;
