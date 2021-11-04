/* eslint jsx-a11y/control-has-associated-label: 0, no-prototype-builtins: 0 */
import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from 'baseui/modal';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles.scss';
import { baseUrl, urls } from '../utils/constants';
import {
  addToCartAction,
  clearCartAction,
  updateCartAction,
} from '../store/actions';
import NewRestaurantConfirmationModal from './NewRestaurantConfirmationModal';

const categories = ['', 'Veg', 'Non-Veg', 'Vegan'];

export default function PlaceOrderModal({ isOpen, setIsOpen, dish }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const inCart = cart.items.hasOwnProperty(dish.dishid);
  const [count, setCount] = React.useState(
    inCart ? cart.items[dish.dishid].count : 1,
  );

  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const addToCart = () => {
    if (!inCart) {
      if (
        Object.keys(cart.items).length > 0
        && Object.values(cart.items)[0].restaurantid !== dish.restaurantid
      ) {
        // dish is from new restaurant. show confirmation
        setShowConfirmModal(true);
      } else {
        dispatch(addToCartAction({ ...dish, count }));
      }
    } else {
      dispatch(updateCartAction({ ...dish, count }));
    }
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        onClose={() => {
          setIsOpen(false);
        }}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader>{dish.dishname}</ModalHeader>
        <ModalBody>
          <div
            id="dish-view"
            className={`carousel slide ${styles.placeOrderModal}`}
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {dish.pictures.map((pic, index) => (
                <button
                  type="button"
                  data-bs-target="#dish-view"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                />
              ))}
            </div>

            <div className="carousel-inner">
              {dish.pictures.map((pic, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img
                    src={`${baseUrl}images/${pic}`}
                    alt="Los Angeles"
                    className={`d-block ${styles.placeOrderModalImage}`}
                    style={{ width: '100%' }}
                  />
                </div>
              ))}
              {dish.pictures.length === 0 && (
                <div className="carousel-item active">
                  <img
                    src={`${baseUrl}${urls.uploadsFolder}/no-image`}
                    alt="Los Angeles"
                    className="d-block"
                    style={{ width: '100%' }}
                  />
                </div>
              )}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#dish-view"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#dish-view"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
            </button>
          </div>
          <div>
            Description:
            {dish.description}
          </div>
          <div>
            Category:
            {categories[dish.category]}
          </div>
          <div>
            Price: $
            {dish.price}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className={styles.placeOrderModalFooter}>
            <div>
              <IconButton
                aria-label="Remove"
                component="span"
                onClick={() => {
                  if (count > 1) {
                    setCount(count - 1);
                  }
                }}
              >
                <SubtractIcon />
              </IconButton>
              &nbsp;&nbsp;
              {count}
              &nbsp;&nbsp;
              <IconButton
                aria-label="Add"
                component="span"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <AddIcon />
              </IconButton>
            </div>

            <ModalButton
              className={styles.placeOrderModalFooterButton}
              onClick={addToCart}
            >
              Add
              {' '}
              {count}
              {' '}
              to order
              {' '}
              <span className={styles.placeOrderModalFooterButtonPrice}>
                $
                {count * dish.price}
              </span>
            </ModalButton>
          </div>
        </ModalFooter>
      </Modal>
      <NewRestaurantConfirmationModal
        isOpen={showConfirmModal}
        setIsOpen={(open) => {
          setShowConfirmModal(open);
        }}
        onConfirm={() => {
          dispatch(clearCartAction());
          dispatch(addToCartAction({ ...dish, count }));
          setShowConfirmModal(false);
        }}
      />
    </>
  );
}

PlaceOrderModal.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
  dish: {},
};

PlaceOrderModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  dish: PropTypes.shape({
    dishname: PropTypes.string,
    pictures: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.number,
    price: PropTypes.number,
    dishid: PropTypes.number,
    restaurantid: PropTypes.number,
  }),
};
