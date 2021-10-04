import * as React from 'react';
import { Card, StyledBody, StyledAction } from 'baseui/card';
// import {Button} from 'baseui/button';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { baseUrl, urls } from '../utils/constants';
import { setCurrentTabAction } from '../store/actions';

export default function RestaurantCard({ restaurant }) {
  const dispatch = useDispatch();
  return (
    <Card
      key={restaurant.userid}
      overrides={{ Root: { style: { width: '328px', cursor: 'pointer' } } }}
      headerImage={`${baseUrl}${urls.uploadsFolder}/${
        JSON.parse(restaurant.pictures)[0] || 'no-image'
      }`}
      title={`${restaurant.name} - ${restaurant.city}`}
      onClick={() => {
        dispatch(setCurrentTabAction(4));
      }}
    >
      <StyledBody>{restaurant.description}</StyledBody>
      <StyledAction>
        {/* <Button overrides={{BaseButton: {style: {width: '100%'}}}}>
          Button Label
        </Button> */}
      </StyledAction>
    </Card>
  );
}

RestaurantCard.defaultProps = {
  restaurant: {
    restaurantid: '',
    userid: '',
    name: '',
    description: '',
    pictures: '[]',
    city: '',
  },
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    restaurantid: PropTypes.string,
    userid: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    pictures: PropTypes.string,
    city: PropTypes.string,
  }),
};
