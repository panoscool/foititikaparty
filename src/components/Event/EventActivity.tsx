import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

const activity = [
  {
    userImg: '/assets/images/user.png',
    primary: 'New Event!',
    secondary: 'about 10 hours ago'
  },
  {
    userImg: '/assets/images/user.png',
    primary: 'New Event!',
    secondary: 'about 5 hours ago'
  },
  {
    userImg: '/assets/images/user.png',
    primary: 'Canceled Event.',
    secondary: 'about 15 hours ago'
  }
];

function EventActivity() {
  return (
    <Paper>
      <List subheader={<ListSubheader>Recent Activity</ListSubheader>}>
        <Divider variant="fullWidth" />
        {activity.map((a, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                <img src={a.userImg} width="45px" height="auto" alt="user" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={a.primary} secondary={a.secondary} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default EventActivity;
