import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import {Link} from 'react-router-dom';

import Phone from '../../assets/phone.png';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  },
  cardContent: {
    padding: 0,
  },
  cardMedia: {
    width: '22%',
  },
  button: {
    alignSelf: 'flex-end',
  },
}));

export default function FeaturedPost(props) {
  const classes = useStyles();
  const {product, to, onCompareClick, inCompare} = props;
  console.log(inCompare);

  return (
    <Card className={classes.card} variant="outlined">
      <Hidden xsDown>
        <CardMedia className={classes.cardMedia} image={product.image ?? Phone} title={product.DeviceName} />
      </Hidden>
      <div className={classes.cardDetails}>
        <CardContent className={classes.cardContent}>
          <Typography component="h2" variant="h6" color="textPrimary">
            <Link to={to}>{product.DeviceName}</Link>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {product.status}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {product.sim}
          </Typography>
        </CardContent>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={inCompare ? <CloseIcon /> : <AddIcon />}
          onClick={onCompareClick}
          color={inCompare ? 'secondary' : 'primary'}>
          {inCompare ? 'Remove' : 'Compare'}
        </Button>
      </div>
    </Card>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
