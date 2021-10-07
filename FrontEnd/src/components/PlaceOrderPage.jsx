/* eslint max-len: 0 */
import { Button } from 'baseui/button';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import styles from '../styles.scss';
import { getAddressList } from '../store/actions/addresses';

export default function PlaceOrderPage() {
  const cart = useSelector((state) => state.cart);
  const restaurant = useSelector((state) => state.restaurants.find((res) => res.userid === cart.restaurantid));

  const [deliveryOption, setDeliveryOption] = React.useState('delivery');

  const [deliveryAddress, setDeliveryAddress] = React.useState('new');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddressList());
  }, []);

  let total = 0;
  const taxPercent = 0.15;
  const deliveryFeePercent = 0.8;

  const addresses = useSelector((state) => state.addresses);

  const renderAddresses = () => addresses
    .map((addr) => (
      <Radio value={JSON.stringify(addr)}>
        <div>{addr.location}</div>
        <div>{addr.city}</div>
        <div>{addr.zip}</div>
      </Radio>
    ))
    .concat(<Radio value="new">Use New Address</Radio>);

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
        <div>
          Delivery Options:
          <RadioGroup
            value={deliveryOption}
            onChange={(e) => setDeliveryOption(e.currentTarget.value)}
            name="deliveryOption"
            align={ALIGN.horizontal}
          >
            <Radio value="delivery">Delivery</Radio>
            <Radio value="pickup">Pickup</Radio>
          </RadioGroup>
        </div>
        <div>
          Address:
          <div>
            <RadioGroup
              value={deliveryAddress}
              onChange={(event) => {
                setDeliveryAddress(event.target.value);
              }}
              name="deliveryAddress"
              align={ALIGN.vertical}
            >
              {renderAddresses()}
            </RadioGroup>
            <fieldset>
              <FormControl label="Address">
                <Input type="text" />
              </FormControl>
              <FormControl label="City">
                <Input type="text" />
              </FormControl>
              <FormControl label="Zip">
                <Input type="number" />
              </FormControl>
            </fieldset>
          </div>
        </div>
        <hr />
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
