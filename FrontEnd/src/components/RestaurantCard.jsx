import * as React from 'react';
import { Card, StyledBody, StyledAction } from 'baseui/card';
// import {Button} from 'baseui/button';
import PropTypes from 'prop-types';

export default function RestaurantCard({ restaurant }) {
  return (
    <Card
      key={restaurant.userid}
      overrides={{ Root: { style: { width: '328px', cursor: 'pointer' } } }}
      headerImage="https://source.unsplash.com/user/erondu/700x400"
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
  },
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    restaurantid: PropTypes.string,
    userid: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};
