import { toast } from 'react-toastify';
import { createToastBody, toastOptions } from '../../utils';
import { getOrderList } from '../../utils/endpoints';
import { SET_ORDER_LIST } from './types';

export const setOrderListAction = (orderlist) => ({
  type: SET_ORDER_LIST,
  payload: orderlist,
});

export const getOrderListAction = () => async (dispatch, getState) => {
  const { userid, type } = getState().user;
  try {
    const response = await getOrderList(userid, type);
    dispatch(setOrderListAction(response));
  } catch (error) {
    console.log(error);
    toast.error(createToastBody(error), toastOptions);
  }
};
