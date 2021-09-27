import { Box, AppBar, Toolbar } from '@material-ui/core';
import React, { useState } from 'react';
import CustomerDashboard from './CustomerDashboard';
import ProfileMenu from '../components/ProfileMenu';
import NavTabs from '../components/NavTabs';

export default function Home() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            Uber Eats
            <div style={{ flexGrow: 1 }}>
              <NavTabs setCurrentTab={setCurrentTab} currentTab={currentTab} />
            </div>
            <ProfileMenu setCurrentTab={setCurrentTab} />
          </Toolbar>
        </AppBar>
        <CustomerDashboard currentTab={currentTab} />
      </Box>
    </div>
  );
}
