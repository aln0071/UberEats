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
  const isFavorite = favorites.includes(restaurant.userid);
  return (
    <Card
      key={restaurant.userid}
      overrides={{
        Root: { style: { width: '328px', cursor: 'pointer', height: '380px' } },
        HeaderImage: {
          style: {
            display: 'block',
            maxWidth: '100%',
            width: '328px',
            height: '270px',
            objectFit: 'cover',
          },
        },
        Contents: { style: { whiteSpace: 'nowrap', overflow: 'hidden' } },
        Title: {
          style: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
      }}
      headerImage={`${baseUrl}${
        restaurant.pictures[0] ? 'images' : urls.uploadsFolder
      }/${restaurant.pictures[0] || 'no-image'}`}
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
      <StyledBody>
        <div
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {restaurant.description}
        </div>
      </StyledBody>
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
