import React from 'react';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { useSelector, useDispatch } from 'react-redux';
import { addFiltersAction } from '../store/actions';

export default function Filters() {
  const { deliverymode } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  return (
    <div>
      <hr />
      Mode of delivery:
      <RadioGroup
        value={deliverymode}
        onChange={(e) => {
          dispatch(
            addFiltersAction({
              deliverymode: e.currentTarget.value,
            }),
          );
        }}
        name="number"
        align={ALIGN.vertical}
      >
        <Radio value="both">Both</Radio>
        <Radio value="delivery">Delivery</Radio>
        <Radio value="pickup">Pickup</Radio>
      </RadioGroup>
      <hr />
    </div>
  );
}
