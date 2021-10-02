import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Cell } from 'baseui/layout-grid';
import { getAllRestaurantsAction } from '../store/actions/restaurants';
import RestaurantCard from './RestaurantCard';

export default function Restaurants() {
  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.restaurants);

  useEffect(() => {
    if (JSON.stringify(restaurants) === '[]') {
      dispatch(getAllRestaurantsAction());
    }
  }, []);

  const renderRestaurants = () => restaurants.map((restaurant) => (
    <Cell span={4}>
      <RestaurantCard restaurant={restaurant} />
    </Cell>
  ));

  return (
    <div className="restaurants-container">
      <h1>Restaurants</h1>
      <div>Search bar</div>
      <Grid gridGaps={[2, 6, 12]}>{renderRestaurants()}</Grid>
      <ul>
        <li>rest 1</li>
        <li>rest 2</li>
        <li>rest 3</li>
      </ul>
    </div>
  );
}
