import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

function SettingsNav() {
  return (
    <Paper>
      <Typography variant="h6">
        Text only
      </Typography>
      <List>
        <ListItem button component={Link} to='/settings/basics'>
          <ListItemText primary="Basics" />
        </ListItem>
        <ListItem button component={Link} to='/settings/about'>
          <ListItemText primary="About me" />
        </ListItem>
        <ListItem button component={Link} to='/settings/photos'>
          <ListItemText primary="My photos" />
        </ListItem>
      </List>
    </Paper>
  )
}

export default SettingsNav;
