/* eslint react/jsx-props-no-spreading: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import StoreIcon from '@material-ui/icons/Store';
import { useSelector } from 'react-redux';
import FastfoodIcon from '@material-ui/icons/Fastfood';

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs({ setCurrentTab, currentTab }) {
  const classes = useStyles();

  const user = useSelector((state) => state.user);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ boxShadow: 'none' }}
        color="transparent"
      >
        {user.type === 'c' && (
          <Tabs
            value={currentTab}
            onChange={handleChange}
            aria-label="scrollable prevent tabs example"
            centered
          >
            <Tab
              label="Restaurants"
              icon={<StoreIcon />}
              aria-label="restaurants"
              {...a11yProps(0)}
            />
            <Tab
              label="Favorites"
              icon={<FavoriteIcon />}
              aria-label="favorite"
              {...a11yProps(1)}
            />
            <Tab
              label="Orders"
              icon={<ShoppingBasket />}
              aria-label="shopping"
              {...a11yProps(4)}
            />
          </Tabs>
        )}
        {user.type === 'r' && (
          <Tabs
            value={currentTab}
            onChange={handleChange}
            aria-label="scrollable prevent tabs example"
            centered
          >
            <Tab
              label="Profile"
              icon={<StoreIcon />}
              aria-label="profile"
              {...a11yProps(0)}
            />
            <Tab
              label="Dishes"
              icon={<FastfoodIcon />}
              aria-label="dishes"
              {...a11yProps(1)}
            />
            <Tab
              label="Orders"
              icon={<ShoppingBasket />}
              aria-label="orders"
              {...a11yProps(4)}
            />
          </Tabs>
        )}
      </AppBar>
    </div>
  );
}

NavTabs.defaultProps = {
  currentTab: 0,
  setCurrentTab: () => {},
};

NavTabs.propTypes = {
  currentTab: PropTypes.number,
  setCurrentTab: PropTypes.func,
};
