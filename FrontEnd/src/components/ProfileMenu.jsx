import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Menu, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/actions';

export default function ProfileMenu({ setCurrentTab }) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setCurrentTab(3);
            handleClose();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(logoutAction());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

ProfileMenu.defaultProps = {
  setCurrentTab: () => {},
};

ProfileMenu.propTypes = {
  setCurrentTab: PropTypes.func,
};
