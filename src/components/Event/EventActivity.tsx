import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  }
}));

export default function NestedList() {
  const classes = useStyles();

  return (
    <List
      className={classes.root}
      subheader={
        <ListSubheader>
          Recent Activity
        </ListSubheader>
      }
    >
      <Divider variant='fullWidth' />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <img src='/assets/images/user.png' width='45px' height='auto' alt='user' />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="New Event!" secondary="about 15 hours ago" />
      </ListItem>
    </List>
  );
}
