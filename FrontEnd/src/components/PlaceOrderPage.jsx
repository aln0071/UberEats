/* eslint max-len: 0 */
import { Button } from 'baseui/button';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import { Select } from 'baseui/select';
import { toast } from 'react-toastify';
import { Textarea } from 'baseui/textarea';
import styles from '../styles.scss';
import { getAddressList } from '../store/actions/addresses';
import { getCities } from '../utils/endpoints';
import { isValid, validations } from '../utils/validations';
import { toastOptions } from '../utils';
import { placeOrderAction } from '../store/actions/placeOrder';
import ConfirmOrderModal from './ConfirmOrderModal';

export default function PlaceOrderPage() {
  const cart = useSelector((state) => state.cart);
  const restaurant = useSelector((state) => state.restaurants.find((res) => res.userid === cart.restaurantid));

  const deliveryOnly = restaurant.deliverymode === 2;
  const pickupOnly = restaurant.deliverymode === 3;

  const initialDeliveryOptionValue = pickupOnly ? 'pickup' : 'delivery';

  const user = useSelector((state) => state.user);

  const [deliveryOption, setDeliveryOption] = React.useState(
    initialDeliveryOptionValue,
  );

  const [deliveryAddress, setDeliveryAddress] = React.useState('new');

  const dispatch = useDispatch();

  const [cities, setCities] = useState([]);

  const [address, setAddress] = useState({});

  const [instructions, setInstructions] = useState('');

  useEffect(async () => {
    dispatch(getAddressList());
    try {
      const citylist = await getCities(user.statecode || restaurant.statecode);
      setCities(citylist);
    } catch (error) {
      console.log(error);
    }
  }, []);

  let total = 0;
  const taxPercent = 0.15;
  const deliveryFeePercent = 0.2;

  const addresses = useSelector((state) => {
    if (user.location !== '') {
      return [
        // { location: user.location, city: user.city, zip: user.zip },
        ...state.addresses,
      ];
    }
    return state.addresses;
  });

  const placeOrder = () => {
    let values = {};
    if (deliveryOption === 'delivery') {
      if (deliveryAddress === 'new') {
        // validate address
        const locationProfile = validations.placeOrder;
        const errors = {};
        const { city, zip, location } = address;
        values = {
          zip,
          location,
          citycode: city && city[0] && city[0].id,
          city: city && city[0] && city[0].label,
        };
        Object.keys(locationProfile).forEach((key) => {
          if (!isValid(locationProfile[key].regex, values[key] || '')) {
            errors[key] = locationProfile[key].message;
          }
        });
        if (Object.keys(errors).length > 0) {
          toast.error('Error: Invalid address', toastOptions);
          return;
        }
      } else {
        values = JSON.parse(deliveryAddress);
      }
    } else {
      values = {
        locationid: restaurant.locationid,
        zip: restaurant.zip,
        location: restaurant.location,
        citycode: restaurant.citycode,
        city: restaurant.city,
      };
    }
    // place order
    dispatch(
      placeOrderAction({
        ...values,
        name: restaurant.name,
        customername: user.name,
        customeremail: user.email,
        customerphone: user.phone,
        price: parseFloat(
          (
            total
            * (1
              + taxPercent
              + (deliveryOption === 'delivery' ? deliveryFeePercent : 0))
          ).toFixed(2),
        ),
        tax: parseFloat((total * taxPercent).toFixed(2)),
        deliveryfee: parseFloat(
          (deliveryOption === 'delivery'
            ? total * deliveryFeePercent
            : 0
          ).toFixed(2),
        ),
        deliverymode: deliveryOption === 'delivery' ? 2 : 3,
        instructions,
      }),
    );
  };

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
            {!pickupOnly && <Radio value="delivery">Delivery</Radio>}
            {!deliveryOnly && <Radio value="pickup">Pickup</Radio>}
          </RadioGroup>
        </div>
        {deliveryOption === 'delivery' && (
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
                  <Input
                    type="text"
                    onChange={(e) => {
                      setAddress({ ...address, location: e.target.value });
                    }}
                  />
                </FormControl>
                <FormControl label="City">
                  <Select
                    id="city"
                    onChange={(params) => {
                      setAddress({ ...address, city: params.value });
                    }}
                    options={cities.map((city) => ({
                      label: city.city,
                      id: city.citycode,
                    }))}
                    value={address.city}
                  />
                </FormControl>
                <FormControl label="Zip">
                  <Input
                    type="number"
                    onChange={(e) => {
                      setAddress({ ...address, zip: e.target.value });
                    }}
                  />
                </FormControl>
              </fieldset>
            </div>
          </div>
        )}
        <FormControl label="Instructions">
          <Textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Instructions"
            clearOnEscape
          />
        </FormControl>
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
            onClick={() => placeOrder()}
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
                {(
                  total
                  * (1
                    + taxPercent
                    + (deliveryOption === 'delivery' ? deliveryFeePercent : 0))
                ).toFixed(2)}
              </td>
            </tr>
            <tr>
              <th>Taxes & Fees</th>
              <td>
                $
                {(total * taxPercent).toFixed(2)}
              </td>
            </tr>
            {deliveryOption === 'delivery' && (
              <tr>
                <th>Delivery Fee</th>
                <td>
                  $
                  {(total * deliveryFeePercent).toFixed(2)}
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
      <ConfirmOrderModal />
    </div>
  );
}
