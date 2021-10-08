import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Cell } from 'baseui/layout-grid';
import PropTypes from 'prop-types';
import { getAllRestaurantsAction } from '../store/actions/restaurants';
import RestaurantCard from './RestaurantCard';
import styles from '../styles.scss';
import { getFavoritesListAction } from '../store/actions/favorites';

export default function Restaurants({ onlyFavorites }) {
  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(getFavoritesListAction());
    if (JSON.stringify(restaurants) === '[]') {
      dispatch(getAllRestaurantsAction());
    }
  }, []);

  const favorites = useSelector((state) => state.favorites);

  const renderRestaurants = () => restaurants
    .filter((restaurant) => {
      console.log(favorites);
      if (onlyFavorites && !favorites.includes(restaurant.restaurantid)) {
        return null;
      }
      return restaurant;
    })
    .map((restaurant) => (
      <Cell span={4}>
        <RestaurantCard restaurant={restaurant} />
      </Cell>
    ));

  return (
    <div className={styles.restaurantsContainer}>
      <Grid gridGaps={[2, 6, 12]}>{renderRestaurants()}</Grid>
    </div>
  );
}

Restaurants.defaultProps = {
  onlyFavorites: false,
};

Restaurants.propTypes = {
  onlyFavorites: PropTypes.bool,
};
