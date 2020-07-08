import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {AppContext} from '../utiles/AppContext';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import Product from '../components/product';
import InfiniteScroll from 'react-infinite-scroll-component';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
  loadMorebtn: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  circularProgress: {
    marginRight: 10,
  },
}));

export default function Explore(props) {
  const classes = useStyles();
  const history = useHistory();
  const {devices, enableAutoLoad, comparingDevices, setComparingDevices} = useContext(AppContext);
  const [shownDevicesCount, setShownDevicesCount] = React.useState(10);
  const [isFetchingData, setIsFetchingData] = React.useState(false);

  const navigateToSettings = () => {
    history.push('/Settings');
  };

  const handleOnCompareClick = (mobile) => {
    const index = comparingDevices.findIndex((el) => el.DeviceName === mobile.DeviceName);
    if (index > -1) {
      let newComparingDevices = [...comparingDevices];
      const removedDevice = newComparingDevices.splice(index, 1);
      setComparingDevices(newComparingDevices);
    } else {
      if (comparingDevices.length < 2) {
        setComparingDevices([...comparingDevices, mobile]);
      }
    }
  };

  const fetchData = () => {
    setIsFetchingData(true);
    setTimeout(() => {
      setShownDevicesCount(shownDevicesCount + 10);
      setIsFetchingData(false);
    }, 1500);
  };

  return devices ? (
    <InfiniteScroll dataLength={devices.slice(0, shownDevicesCount - 1).length} next={fetchData} height="100vh" hasMore={enableAutoLoad}>
      <div className={classes.appBarSpacer} />

      <Grid container className={classes.container} justify="center" spacing={0}>
        <Grid item xs={12} lg={9}>
          <Paper className={classes.paper} elevation={2}>
            <Grid container spacing={2}>
              {devices.slice(0, shownDevicesCount - 1).map((mobile) => (
                <Grid item xs={12}>
                  <Product
                    product={mobile}
                    target="_blank"
                    inCompare={comparingDevices.find((el) => el.DeviceName === mobile.DeviceName)}
                    to={`/device/${mobile.DeviceName}`}
                    onCompareClick={() => handleOnCompareClick(mobile)}
                  />
                </Grid>
              ))}
            </Grid>
            <div className={classes.loadMorebtn}>
              {isFetchingData ? (
                <Typography component="h2" variant="h6" color="primary" align="center">
                  <CircularProgress size={20} className={classes.circularProgress} />
                  Loading...
                </Typography>
              ) : (
                !enableAutoLoad &&
                shownDevicesCount < 100 && (
                  <Button variant="contained" className={classes.button} fullWidth={false} onClick={fetchData} color="primary">
                    Load More
                  </Button>
                )
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </InfiniteScroll>
  ) : (
    <>
      <div className={classes.appBarSpacer} />
      <Grid container className={classes.container} justify="center" spacing={0}>
        <Grid item xs={12} lg={9}>
          <Paper className={classes.paper} elevation={2}>
            <Alert
              severity="warning"
              action={
                <Button color="inherit" size="small" onClick={navigateToSettings}>
                  Edit Settings
                </Button>
              }>
              Token is invalid or not provided
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
