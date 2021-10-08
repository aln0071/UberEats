import { toast } from 'react-toastify';
import { hideOrderDetailsModalAction } from '.';
import { createToastBody, toastOptions } from '../../utils';
import { cancelOrder } from '../../utils/endpoints';
import { getOrderListAction } from './getOrders';

export const cancelOrderAction = () => async (dispatch, getState) => {
  const { orderid } = getState().orderDetailsModal;
  try {
    const response = await cancelOrder(orderid);
    if (response.status === true) {
      toast.success('Success: Order canceled', toastOptions);
      dispatch(hideOrderDetailsModalAction());
      dispatch(getOrderListAction());
    } else {
      throw new Error('Failed to cancel order');
    }
  } catch (error) {
    console.log(error);
    toast.error(createToastBody(error), toastOptions);
  }
};

export const test = () => {};
