import {
  Box, AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomerDashboard from './CustomerDashboard';
import NavTabs from '../components/NavTabs';
import ProfileMenu from '../components/ProfileMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            Uber Eats
            <Typography variant="h6" className={classes.title}>
              <NavTabs />
            </Typography>
            <Button color="inherit">Logout</Button>
            <ProfileMenu />
          </Toolbar>
        </AppBar>
        <CustomerDashboard />
      </Box>
    </div>
  );
}
