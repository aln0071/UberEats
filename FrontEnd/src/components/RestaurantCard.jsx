import * as React from 'react';
import { Card, StyledBody, StyledAction } from 'baseui/card';
// import {Button} from 'baseui/button';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import {
  setCurrentRestaurantAction,
  setCurrentTabAction,
} from '../store/actions';
import { baseUrl, urls } from '../utils/constants';
import { toggleFavoriteAction } from '../store/actions/favorites';

export default function RestaurantCard({ restaurant }) {
  const dispatch = useDispatch();
  const toggleFavorites = () => dispatch(toggleFavoriteAction(restaurant.userid));
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.findIndex(
    (rest) => rest.restaurantid === restaurant.restaurantid,
  ) !== -1;
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
        dispatch(setCurrentRestaurantAction(restaurant));
      }}
      style={{ position: 'relative' }}
    >
      <div style={{ position: 'absolute', top: 3, right: 5 }}>
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorites();
          }}
          color="secondary"
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
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
