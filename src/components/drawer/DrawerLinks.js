import React, {useContext} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Settings from '@material-ui/icons/Settings';
import LayersIcon from '@material-ui/icons/Layers';
import {Link} from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import {AppContext} from '../../utiles/AppContext';

export default function MainListItems(props) {
  const {comparingDevices} = useContext(AppContext);

  return (
    <div>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Explore" />
      </ListItem>
      <ListItem button component={Link} to="/Compare">
        <ListItemIcon>
          <Badge badgeContent={comparingDevices?.length} color="secondary">
            <LayersIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="Compare" />
      </ListItem>
      <ListItem button component={Link} to="/Settings">
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </div>
  );
}
