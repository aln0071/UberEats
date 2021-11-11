import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showOrderDetailsModalAction } from '../store/actions';
import {
  getOrderListAction,
  setOrdersIndexAction,
  setOrdersPerPageAction,
} from '../store/actions/getOrders';
import { deliveryModes, deliveryStatus } from '../utils/constants';
import OrderDetailsModal from './OrderDetailsModal';
import styles from '../styles.scss';

export default function Orders() {
  const dispatch = useDispatch();

  // const restaurants = useSelector(state => state.restaurants);
  const {
    orders, user, filters, ordersPagination,
  } = useSelector(
    (state) => state,
  );

  const page = Math.ceil(
    (ordersPagination.startingIndex + 1) / ordersPagination.ordersPerPage,
  );
  const totalPages = Math.ceil(
    ordersPagination.totalCount / ordersPagination.ordersPerPage,
  );

  useEffect(() => {
    dispatch(getOrderListAction());
  }, []);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const applyFilter = (order) => {
    const { name } = filters;
    if (
      name !== ''
      && !String(deliveryStatus[order.status].label)
        .toLocaleLowerCase()
        .startsWith(name)
    ) {
      return null;
    }
    return order;
  };

  return (
    <div>
      <div className="container">
        <h2>{user.type === 'c' ? 'Past Orders' : 'Orders'}</h2>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              {user.type === 'c' && <th scope="col">Restaurant</th>}
              <th scope="col">Price</th>
              <th scopt="col">Delivery Mode</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .sort(
                (a, b) => new Date(b[deliveryStatus[1].time])
                  - new Date(a[deliveryStatus[1].time]),
              )
              .filter((order) => applyFilter(order))
              .map((order) => (
                <tr
                  onClick={() => {
                    dispatch(showOrderDetailsModalAction({ order }));
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <th scope="row">{order._id}</th>
                  {user.type === 'c' && <td>{order.name}</td>}
                  <td>
                    $
                    {order.price}
                  </td>
                  <td>{deliveryModes[order.deliverymode]}</td>
                  <td>
                    {deliveryStatus[order.status].label}
                    {' '}
                    -
                    {' '}
                    {new Date(
                      order[deliveryStatus[order.status].time],
                    ).toLocaleDateString('en-US', dateOptions)}
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">
                <div className={styles.ordersFooterContainer}>
                  <div className={styles.ordersPerpage}>
                    Rows Per Page:&nbsp;
                    <select
                      value={ordersPagination.ordersPerPage}
                      onChange={(e) => dispatch(setOrdersPerPageAction(e.target.value))}
                    >
                      <option value={2}>2</option>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                    </select>
                  </div>
                  <div>
                    <span
                      style={{ cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                      role="button"
                      onKeyPress={() => {}}
                      tabIndex={0}
                      onClick={() => {
                        if (page !== 1) {
                          dispatch(
                            setOrdersIndexAction(
                              ordersPagination.startingIndex
                                - ordersPagination.ordersPerPage,
                            ),
                          );
                          dispatch(getOrderListAction());
                        }
                      }}
                    >
                      &#9664;
                    </span>
                    &nbsp;
                    {page}
                    /
                    {totalPages}
                    &nbsp;
                    <span
                      style={{
                        cursor: page === totalPages ? 'not-allowed' : 'pointer',
                      }}
                      role="button"
                      onKeyPress={() => {}}
                      tabIndex={0}
                      onClick={() => {
                        if (page !== totalPages) {
                          dispatch(
                            setOrdersIndexAction(
                              ordersPagination.startingIndex
                                + ordersPagination.ordersPerPage,
                            ),
                          );
                          dispatch(getOrderListAction());
                        }
                      }}
                    >
                      &#9654;
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <OrderDetailsModal />
    </div>
  );
}
