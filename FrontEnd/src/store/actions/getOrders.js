import { toast } from 'react-toastify';
import { createToastBody, toastOptions } from '../../utils';
import { getOrderList } from '../../utils/endpoints';
import {
  SET_ORDER_LIST,
  SET_ORDERS_PER_PAGE,
  SET_ORDERS_INDEX,
  SET_ORDERS_TOTAL_COUNT,
} from './types';

export const setOrderListAction = (orderlist) => ({
  type: SET_ORDER_LIST,
  payload: orderlist,
});

export const setOrdersIndexAction = (index) => ({
  type: SET_ORDERS_INDEX,
  payload: index,
});

export const setOrdersTotalCountAction = (count) => ({
  type: SET_ORDERS_TOTAL_COUNT,
  payload: count,
});

export const getOrderListAction = () => async (dispatch, getState) => {
  const { userid, type } = getState().user;
  const { ordersPerPage, startingIndex } = getState().ordersPagination;
  try {
    const response = await getOrderList(
      userid,
      type,
      ordersPerPage,
      startingIndex,
    );
    dispatch(setOrderListAction(response.orders));
    dispatch(setOrdersTotalCountAction(parseInt(response.count, 10)));
  } catch (error) {
    console.log(error);
    toast.error(createToastBody(error), toastOptions);
  }
};

export const setOrdersPerPageAction = (ordersPerPage) => (dispatch) => {
  dispatch({
    type: SET_ORDERS_PER_PAGE,
    payload: parseInt(ordersPerPage, 10),
  });
  dispatch(setOrdersIndexAction(0));
  dispatch(getOrderListAction());
};
