import React, {useContext, useEffect, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {AppContext} from '../utiles/AppContext';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
  root: {
    marginTop: theme.spacing(4),
  },
  th: {
    fontWeight: 'bold',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function Compare(props) {
  const classes = useStyles();
  const {devices, comparingDevices, setComparingDevices} = useContext(AppContext);
  const [rows, setRows] = useState([]);

  const handleDeviceSelection = (event, value) => {
    setComparingDevices(value);
  };

  useEffect(() => {
    if (comparingDevices && comparingDevices.length === 2) {
      const data = Object.keys(comparingDevices[0]).map((key) => [key, comparingDevices[0][key], comparingDevices[1][key]]);
      setRows(data);
    }
  }, [comparingDevices]);

  return (
    <>
      <div className={classes.appBarSpacer} />
      <Grid container spacing={0} justify="center" className={classes.container}>
        <Grid item xs={12} lg={9}>
          <Paper className={classes.paper}>
            {devices && (
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={devices}
                value={comparingDevices}
                disableCloseOnSelect
                onChange={handleDeviceSelection}
                getOptionLabel={(option) => option.DeviceName}
                renderOption={(option, {selected}) => (
                  <React.Fragment>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{marginRight: 8}} checked={selected} />
                    {option.DeviceName}
                  </React.Fragment>
                )}
                renderInput={(params) => <TextField {...params} variant="outlined" label="Devices to compare" placeholder="Choose devices" />}
              />
            )}

            {comparingDevices?.length === 2 && (
              <Card className={classes.root}>
                <CardContent>
                  <TableContainer>
                    <Table className={classes.table} aria-label="device table">
                      <TableBody>
                        {rows.map((row, index) => (
                          <TableRow key={row[0]}>
                            <StyledTableCell component="th" className={classes.th} scope="row">
                              {row[0]}
                            </StyledTableCell>
                            <StyledTableCell align="left" width="40%" className={clsx(index === 0 && classes.th)}>
                              {row[1]}
                            </StyledTableCell>
                            <StyledTableCell align="left" width="40%" className={clsx(index === 0 && classes.th)}>
                              {row[2]}
                            </StyledTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
