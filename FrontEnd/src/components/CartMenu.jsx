import React from 'react';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import { Menu } from '@material-ui/core';
import { Button as BaseButton } from 'baseui/button';
import styles from '../styles.scss';

export default function CartMenu() {
  const cart = useSelector((state) => state.cart);
  const itemCount = Object.values(cart.items).reduce((t, c) => t + c.count, 0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderItems = () => {
    if (Object.keys(cart.items).length === 0) {
      return (
        <div className={styles.cartEmpty}>
          <ShoppingCartIcon />
          Add items from a restaurant or store to start a new cart
        </div>
      );
    }
    let total = 0;
    return (
      <div className={styles.cartHasItems}>
        <h4>Your Order</h4>
        {Object.values(cart.items).map((item) => {
          total += item.price * item.count;
          return (
            <div className={styles.cartItem}>
              <div className={styles.cartItemHeader}>{item.dishname}</div>
              <div className={styles.cartItemDescription}>
                {item.description}
              </div>
              <div className={styles.cartItemDetails}>
                <span>
                  Quantiry:
                  {item.count}
                </span>
                <span>
                  Price: $
                  {item.price * item.count}
                </span>
              </div>
              <hr />
            </div>
          );
        })}
        <BaseButton className={styles.cartButton}>
          Checkout
          <div className={styles.cartTotal}>
            $
            {total}
          </div>
        </BaseButton>
      </div>
    );
  };

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        onClick={handleMenu}
        style={{
          borderRadius: '20px',
          backgroundColor: 'black',
          color: 'white',
        }}
        startIcon={<ShoppingCartIcon />}
      >
        Cart &#9679;
        {' '}
        {itemCount}
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        style={{ transform: 'translateY(36px)' }}
      >
        <div style={{ padding: '7px', minWidth: '400px' }}>{renderItems()}</div>
      </Menu>
    </div>
  );
}
