/* eslint max-len: 0 */
import { Button } from 'baseui/button';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles.scss';

export default function PlaceOrderPage() {
  const cart = useSelector((state) => state.cart);
  const restaurant = useSelector((state) => state.restaurants.find((res) => res.userid === cart.restaurantid));

  let total = 0;
  const taxPercent = 0.15;
  const deliveryFeePercent = 0.8;

  const renderItems = () => (
    <div>
      {Object.values(cart.items).map((item) => {
        total += item.count * item.price;
        return (
          <div>
            <div className={styles.placeOrderBodyLeftItemHeader}>
              {item.dishname}
            </div>
            <div className={styles.placeOrderBodyLeftItemBody}>
              {item.description}
            </div>
            <div className={styles.placeOrderBodyLeftItemFooter}>
              <span>
                Quantity:
                {item.count}
              </span>
              <span>
                $
                {item.count * item.price}
              </span>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );

  if (restaurant === undefined) {
    console.log('returning un');
    return null;
  }
  return (
    <div className={styles.placeOrderBody}>
      <div className={styles.placeOrderBodyLeft}>
        <h1>{restaurant.name}</h1>
        {renderItems()}
      </div>
      <div className={styles.placeOrderBodyRight}>
        <div className={styles.placeOrderBodyRightHeader}>
          <Button
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  outline: $theme.colors.positive400,
                  backgroundColor: $theme.colors.positive400,
                }),
              },
            }}
          >
            <span className={styles.placeOrderBodyRightHeaderButton}>
              Place Order
            </span>
          </Button>
          <div className={styles.placeOrderBodyRightHeaderDescription}>
            If you’re not around when the delivery person arrives, they’ll leave
            your order at the door. By placing your order, you agree to take
            full responsibility for it once it’s delivered.
          </div>
        </div>
        <div className={styles.placeOrderBodyRightTable}>
          <table>
            <tr>
              <th>Subtotal</th>
              <td>
                $
                {(total * (1 + taxPercent + deliveryFeePercent)).toFixed(2)}
              </td>
            </tr>
            <tr>
              <th>Taxes & Fees</th>
              <td>
                $
                {(total * taxPercent).toFixed(2)}
              </td>
            </tr>
            <tr>
              <th>Delivery Fee</th>
              <td>
                $
                {(total * deliveryFeePercent).toFixed(2)}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
