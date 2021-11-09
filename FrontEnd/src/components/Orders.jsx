import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showOrderDetailsModalAction } from '../store/actions';
import { getOrderListAction } from '../store/actions/getOrders';
import { deliveryModes, deliveryStatus } from '../utils/constants';
import OrderDetailsModal from './OrderDetailsModal';

export default function Orders() {
  const dispatch = useDispatch();

  // const restaurants = useSelector(state => state.restaurants);
  const { orders, user, filters } = useSelector((state) => state);

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
        </table>
      </div>
      <OrderDetailsModal />
    </div>
  );
}
