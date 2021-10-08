import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Restaurants from '../components/Restaurants';
import Profile from './Profile';
import Dishes from '../components/Dishes';
import Orders from '../components/Orders';
import RestaurantPage from '../components/RestaurantPage';
import PlaceOrderPage from '../components/PlaceOrderPage';

function TabPanel({ value, index, children }) {
  if (value === index) {
    return <div>{children}</div>;
  }
  return null;
}

TabPanel.defaultProps = {
  value: 0,
  index: 0,
  children: undefined,
};

TabPanel.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number,
  children: PropTypes.node,
};

export default function Dashboard({ currentTab }) {
  const user = useSelector((state) => state.user);

  return (
    <div>
      {user.type === 'c' && (
        <div>
          <TabPanel value={currentTab} index={0}>
            <Restaurants />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            Favorites
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <Orders />
          </TabPanel>
          <TabPanel value={currentTab} index={3}>
            <Profile />
          </TabPanel>
          <TabPanel value={currentTab} index={4}>
            <RestaurantPage />
          </TabPanel>
          <TabPanel value={currentTab} index={5}>
            <PlaceOrderPage />
          </TabPanel>
        </div>
      )}
      {user.type === 'r' && (
        <div>
          <TabPanel value={currentTab} index={0}>
            <Profile />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <Dishes />
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <Orders />
          </TabPanel>
        </div>
      )}
    </div>
  );
}

Dashboard.defaultProps = {
  currentTab: 0,
};

Dashboard.propTypes = {
  currentTab: PropTypes.number,
};
