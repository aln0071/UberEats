import { toast } from 'react-toastify';
import { hideOrderDetailsModalAction } from '.';
import { createToastBody, toastOptions } from '../../utils';
import { updateOrder } from '../../utils/endpoints';
import { getOrderListAction } from './getOrders';

export const cancelOrderAction = () => async (dispatch, getState) => {
  const { _id } = getState().orderDetailsModal;
  try {
    await updateOrder(_id, 'canceled');
    toast.success('Success: Order canceled', toastOptions);
    dispatch(hideOrderDetailsModalAction());
    dispatch(getOrderListAction());
  } catch (error) {
    console.log(error);
    toast.error(createToastBody(error), toastOptions);
  }
};

export const changeOrderStatusAction = (type) => async (dispatch, getState) => {
  const { _id } = getState().orderDetailsModal;
  try {
    await updateOrder(_id, type);
    toast.success('Success: Order status updated', toastOptions);
    dispatch(hideOrderDetailsModalAction());
    dispatch(getOrderListAction());
  } catch (error) {
    console.log(error);
    toast.error(createToastBody(error), toastOptions);
  }
};

export const test = () => {};
