import React from 'react';
import { Box, AppBar, Toolbar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from './Dashboard';
import ProfileMenu from '../components/ProfileMenu';
import NavTabs from '../components/NavTabs';
import { setCurrentTabAction } from '../store/actions';
import CartMenu from '../components/CartMenu';

export default function Home() {
  const currentTab = useSelector((state) => state.currentTab);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const setCurrentTab = (tabid) => dispatch(setCurrentTabAction(tabid));
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            Uber Eats
            <div style={{ flexGrow: 1 }}>
              <NavTabs setCurrentTab={setCurrentTab} currentTab={currentTab} />
            </div>
            {user.type === 'c' && <CartMenu />}
            <ProfileMenu setCurrentTab={setCurrentTab} />
          </Toolbar>
        </AppBar>
        <Dashboard currentTab={currentTab} />
      </Box>
    </div>
  );
}
