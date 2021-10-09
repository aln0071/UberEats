/* eslint jsx-a11y/control-has-associated-label: 0 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Cell } from 'baseui/layout-grid';
import { setDishesAction } from '../store/actions';
import { getAllDishes } from '../utils/endpoints';
import { baseUrl, urls } from '../utils/constants';
import Dish from './Dish';
import styles from '../styles.scss';
import Filters from './Filters';

export default function RestaurantPage() {
  const restaurant = useSelector((state) => state.currentRestaurant);
  const dishes = useSelector((state) => state.dishes);
  const filters = useSelector((state) => state.filters);

  const dispatch = useDispatch();
  useEffect(async () => {
    try {
      const dishList = await getAllDishes(restaurant);
      dispatch(setDishesAction(dishList));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const renderDishList = () => dishes.map((dish, index) => {
    const { mealtype } = filters;
    if (mealtype === 'veg' && dish.category !== 1) {
      return null;
    } if (mealtype === 'non-veg' && dish.category !== 2) {
      return null;
    } if (mealtype === 'vegan' && dish.category !== 3) {
      return null;
    }
    return (
      <Cell span={4}>
        <Dish dish={dish} index={index} />
      </Cell>
    );
  });

  return (
    <div>
      <div
        id="rest"
        className={`carousel slide ${styles.restaurantCarousel}`}
        data-bs-ride="carousel"
      >
        {/* <div className="carousel-indicators">
          {JSON.parse(restaurant.pictures).map((pic, index) => (
            <button
              type="button"
              data-bs-target="#rest"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
            />
          ))}
        </div> */}

        <div className="carousel-inner">
          {JSON.parse(restaurant.pictures).map((pic, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img
                src={`${baseUrl}${urls.uploadsFolder}/${pic}`}
                alt="Los Angeles"
                className={`d-block ${styles.restaurantCarouselImage}`}
                style={{ width: '100%' }}
              />
            </div>
          ))}
          {restaurant.pictures === '[]' && (
            <div className="carousel-item active">
              <img
                src={`${baseUrl}${urls.uploadsFolder}/no-image`}
                alt="Los Angeles"
                className={`d-block ${styles.restaurantCarouselImage}`}
                style={{ width: '100%' }}
              />
            </div>
          )}
          <h2 className={styles.restaurantCarouselName}>{restaurant.name}</h2>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#rest"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#rest"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
        </button>
      </div>
      <div>{restaurant.description}</div>
      <hr />
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
            gridGutters={[0, 0, 10]}
            gridMargins={[0, 0, 0]}
          >
            {renderDishList()}
          </Grid>
        </Cell>
      </Grid>
    </div>
  );
}
