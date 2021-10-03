import * as React from 'react';
import { Card, StyledBody, StyledAction } from 'baseui/card';
// import {Button} from 'baseui/button';
import PropTypes from 'prop-types';
import { baseUrl, urls } from '../utils/constants';

export default function RestaurantCard({ restaurant }) {
  return (
    <Card
      key={restaurant.userid}
      overrides={{ Root: { style: { width: '328px', cursor: 'pointer' } } }}
      headerImage={`${baseUrl}${urls.uploadsFolder}/${
        JSON.parse(restaurant.pictures)[0] || 'no-image'
      }`}
      title={restaurant.name}
      onClick={() => {
        console.log('h');
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
  },
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    restaurantid: PropTypes.string,
    userid: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    pictures: PropTypes.string,
  }),
};
