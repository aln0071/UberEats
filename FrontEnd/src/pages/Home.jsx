import React from 'react';
import { Box, AppBar, Toolbar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Dashboard from './Dashboard';
import ProfileMenu from '../components/ProfileMenu';
import NavTabs from '../components/NavTabs';
import { addFiltersAction, setCurrentTabAction } from '../store/actions';
import CartMenu from '../components/CartMenu';
import Logo from '../images/Logo';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey[500], 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.grey[500], 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const currentTab = useSelector((state) => state.currentTab);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const setCurrentTab = (tabid) => dispatch(setCurrentTabAction(tabid));
  const getSearchPlaceholder = () => {
    if (currentTab === 0 || currentTab === 1) return 'Search Name or City';
    if (currentTab === 4) return 'Search Dish Name';
    if (currentTab === 2) return 'Search Order Status';
    return 'Search...';
  };
  const filters = useSelector((state) => state.filters);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Logo />
            <div style={{ flexGrow: 1 }}>
              <NavTabs setCurrentTab={setCurrentTab} currentTab={currentTab} />
            </div>
            {(user.type === 'c' || (user.type === 'r' && currentTab === 2)) && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder={getSearchPlaceholder()}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  value={filters.name}
                  onChange={(e) => {
                    dispatch(
                      addFiltersAction({
                        name: String(e.target.value).toLowerCase(),
                      }),
                    );
                  }}
                />
              </div>
            )}
            {user.type === 'c' && <CartMenu />}
            <ProfileMenu setCurrentTab={setCurrentTab} />
          </Toolbar>
        </AppBar>
        <Dashboard currentTab={currentTab} />
      </Box>
    </div>
  );
}
