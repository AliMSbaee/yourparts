import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainListItems from './drawer/DrawerLinks';
import axios from 'axios';
import Explore from '../screens/Explore';
import Compare from '../screens/Compare';
import Settings from '../screens/Settings';
import Device from '../screens/device';
import Logo from '../assets/logo.png';
import {AppContext} from '../utiles/AppContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
    paddingVertical: 0,
    backgroundColor: '#FFF',
  },
  logo: {
    height: 64,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: theme.palette.grey[600],
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
    height: '100vh',
  },
  container: {
    height: '100vh',
  },
}));

export default function AppContainer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [isFetching, setIsFetching] = React.useState(false);
  const [devices, setDevices] = React.useState(null);
  const [token, setToken] = React.useState('');
  const [enableAutoLoad, setEnableAutoLoad] = React.useState(true);
  const [comparingDevices, setComparingDevices] = React.useState([]);

  const value = {
    token,
    setToken,
    enableAutoLoad,
    setEnableAutoLoad,
    devices,
    setDevices,
    comparingDevices,
    setComparingDevices,
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setIsFetching(true);
    axios
      .post(`https://fonoapi.freshpixl.com/v1/getlatest`, {
        token,
        brand: 'samsung',
      })
      .then((res) => {
        if (res.data.status !== 'error') {
          setDevices(res.data);
        }
        setIsFetching(false);
      });
  }, [token]);

  return (
    <AppContext.Provider value={value}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
              <MenuIcon />
            </IconButton>
            <IconButton onClick={handleDrawerClose} className={clsx(classes.menuButton, !open && classes.menuButtonHidden)}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          {isFetching && <LinearProgress color="secondary" />}
        </AppBar>
        <BrowserRouter>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}>
            <div className={classes.toolbarIcon}>
              <img src={Logo} alt="YourParts Logo" className={classes.logo} />
            </div>
            <Divider />
            <List>
              <MainListItems />
            </List>
          </Drawer>
          <main className={classes.content}>
            <Switch>
              <Route exact path="/" component={Explore} />
              <Route exact path="/Compare" component={Compare} />
              <Route exact path="/Settings" component={Settings} />
              <Route exact path={`/device/:DeviceName`} component={Device} />
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}
