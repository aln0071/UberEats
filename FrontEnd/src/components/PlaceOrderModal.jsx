/* eslint jsx-a11y/control-has-associated-label: 0 */
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
import styles from '../styles.scss';
import { baseUrl, urls } from '../utils/constants';

const categories = ['Veg', 'Non-Veg', 'Vegan'];

export default function PlaceOrderModal({ isOpen, setIsOpen, dish }) {
  const [count, setCount] = React.useState(1);

  return (
    <Modal
      onClose={() => {
        setCount(1);
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
            {JSON.parse(dish.pictures).map((pic, index) => (
              <button
                type="button"
                data-bs-target="#dish-view"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
              />
            ))}
          </div>

          <div className="carousel-inner">
            {JSON.parse(dish.pictures).map((pic, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img
                  src={`${baseUrl}${urls.uploadsFolder}/${pic}`}
                  alt="Los Angeles"
                  className={`d-block ${styles.placeOrderModalImage}`}
                  style={{ width: '100%' }}
                />
              </div>
            ))}
            {dish.pictures === '[]' && (
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

          <ModalButton className={styles.placeOrderModalFooterButton}>
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
  }),
};
