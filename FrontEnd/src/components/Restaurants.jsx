import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Cell } from 'baseui/layout-grid';
import PropTypes from 'prop-types';
import { getAllRestaurantsAction } from '../store/actions/restaurants';
import RestaurantCard from './RestaurantCard';
import styles from '../styles.scss';
import { getFavoritesListAction } from '../store/actions/favorites';
import Filters from './Filters';

export default function Restaurants({ onlyFavorites }) {
  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.restaurants);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFavoritesListAction());
    dispatch(getAllRestaurantsAction());
  }, []);

  const filters = useSelector((state) => state.filters);

  const favorites = useSelector((state) => state.favorites);

  const renderRestaurants = () => restaurants
    .filter((restaurant) => {
      if (onlyFavorites && !favorites.includes(restaurant.restaurantid)) {
        return null;
      }
      // apply filters
      const {
        deliverymode, country, state, city, name,
      } = filters;
      if (deliverymode === 'delivery' && restaurant.deliverymode === 3) {
        return null;
      }
      if (deliverymode === 'pickup' && restaurant.deliverymode === 2) {
        return null;
      }

      if (country.length > 0 && country[0].id !== restaurant.countrycode) {
        return null;
      }
      if (state.length > 0 && state[0].id !== restaurant.statecode) {
        return null;
      }
      if (city.length > 0 && city[0].id !== restaurant.citycode) {
        return null;
      }
      if (
        name !== ''
          && !String(restaurant.name + restaurant.city)
            .toLowerCase()
            .includes(name)
      ) {
        return null;
      }
      return restaurant;
    })
    .sort((a, b) => {
      if (user.citycode === null) {
        return 0;
      }
      if (a.citycode === user.citycode && b.citycode === user.citycode) {
        return 0;
      } if (b.citycode !== user.citycode) {
        return -1;
      }
      return 1;
    })
    .map((restaurant) => (
      <Cell span={4}>
        <RestaurantCard restaurant={restaurant} />
      </Cell>
    ));

  return (
    <div className={styles.restaurantsContainer}>
      <Grid
        gridGaps={[0, 0, 0]}
        gridGutters={[0, 0, 10]}
        gridMargins={[0, 0, 0]}
      >
        <Cell span={2}>
          <div className={styles.filters}>
            <h4>Filters</h4>
            <Filters />
          </div>
        </Cell>
        <Cell span={10}>
          <Grid
            gridGaps={[2, 6, 12]}
            gridGutters={[0, 0, 0]}
            gridMargins={[0, 0, 0]}
          >
            {renderRestaurants()}
          </Grid>
        </Cell>
      </Grid>
    </div>
  );
}

Restaurants.defaultProps = {
  onlyFavorites: false,
};

Restaurants.propTypes = {
  onlyFavorites: PropTypes.bool,
};
