import React, {useEffect, useState, useContext} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {AppContext} from '../../utiles/AppContext';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  th: {
    fontWeight: 'bold',
  },
  media: {
    height: 320,
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

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Device = (props) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const {
    params: {DeviceName},
  } = props.match;

  const {devices} = useContext(AppContext);

  useEffect(() => {
    if (!!devices?.length) {
      const product = devices.find((el) => el.DeviceName === DeviceName);
      const data = Object.keys(product).map((key) => [key, product[key]]);
      setRows(data);
    }
  }, [devices, DeviceName]);

  return (
    <>
      <div className={classes.appBarSpacer} />
      <Grid container spacing={0} justify="center" className={classes.container}>
        <Grid item xs={9}>
          <Paper className={classes.paper} elevation={2}>
            <Card className={classes.root}>
              {/* <CardMedia className={classes.media} image="https://i.dlpng.com/static/png/6534793_preview.png" /> */}
              <CardContent>
                <TableContainer>
                  <Table className={classes.table} aria-label="device table">
                    <TableBody>
                      {rows.map((row) => (
                        <StyledTableRow key={row[0]}>
                          <StyledTableCell component="th" className={classes.th} scope="row">
                            {row[0]}
                          </StyledTableCell>
                          <StyledTableCell align="left">{row[1]}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Device;
