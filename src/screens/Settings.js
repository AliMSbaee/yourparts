import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import {AppContext} from '../utiles/AppContext';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  switch: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 0,
  },
  margin: {
    marginTop: theme.spacing(3),
  },
}));

export default function Settings(props) {
  const classes = useStyles();

  const {token, setToken, enableAutoLoad, setEnableAutoLoad} = useContext(AppContext);

  const handleSwitchChange = (event) => {
    setEnableAutoLoad(event.target.checked);
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  return (
    <>
      <div className={classes.appBarSpacer} />
      <Grid container spacing={3} justify="center" className={classes.container}>
        <Grid item xs={12} md={8} lg={6}>
          <Paper className={classes.paper} elevation={2}>
            <div className={classes.seeMore}>
              <FormGroup>
                <FormControlLabel
                  className={classes.switch}
                  control={<Switch checked={enableAutoLoad} onChange={handleSwitchChange} aria-label="Enable AutoLoad" />}
                  label="Automatic Load on scroll"
                  labelPlacement="start"
                />
                <FormControl className={classes.margin} variant="outlined">
                  <InputLabel color="secondary" htmlFor="token-input">
                    Fono Api Token
                  </InputLabel>
                  <OutlinedInput
                    id="token-input"
                    color="secondary"
                    value={token}
                    onChange={handleTokenChange}
                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                    labelWidth={115}
                  />
                </FormControl>
              </FormGroup>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
