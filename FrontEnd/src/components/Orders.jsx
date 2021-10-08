import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderListAction } from '../store/actions/getOrders';
import { deliveryModes, deliveryStatus } from '../utils/constants';

export default function Orders() {
  const dispatch = useDispatch();

  // const restaurants = useSelector(state => state.restaurants);
  const { orders, user } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getOrderListAction());
  }, []);

  return (
    <div>
      <div className="container">
        <h2>Order Details</h2>
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
            {orders.map((order) => (
              <tr>
                <th scope="row">{order.orderid}</th>
                {user.type === 'c' && <td>{order.name}</td>}
                <td>{order.price}</td>
                <td>{deliveryModes[order.deliverymode]}</td>
                <td>{deliveryStatus[order.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
