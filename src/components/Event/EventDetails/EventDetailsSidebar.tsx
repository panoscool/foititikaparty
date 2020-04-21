import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { ListItemSecondaryAction } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listLabel: {
      color: 'white',
      backgroundColor: '#212121',
      padding: 4,
      borderRadius: 4,
      margin: theme.spacing(0)
    },
    text: {
      color: 'red',
      fontWeight: 'bold'
    },
    link: {
      textDecoration: 'none'
    }
  })
);

interface Props {
  hostedBy: string;
  hostUid: string;
  hostPhotoURL: string;
  attendees: any
}

function EventDetailsSidebar({ hostedBy, hostUid, hostPhotoURL, attendees }: Props) {
  const classes = useStyles();

  const filteredAttendees = attendees?.filter((a: any) => hostedBy !== a.displayName);

  return (
    <Paper>
      <div className={classes.listLabel}>
        <Typography variant="h6" align="center">
          People Going
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="avatar" src={hostPhotoURL} />
          </ListItemAvatar>
          <Link to={`/profile/${hostUid}`} className={classes.link}>
            <ListItemText className={classes.text} primary={hostedBy} />
          </Link>
          <ListItemSecondaryAction>Host</ListItemSecondaryAction>
        </ListItem>
        {filteredAttendees?.map((a: any) => (
          <ListItem key={a.id}>
            <ListItemAvatar>
              <Avatar alt="avatar" src={a.photoURL} />
            </ListItemAvatar>
            <Link to={`/profile/${a.id}`} className={classes.link}>
              <ListItemText primary={a.displayName} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default EventDetailsSidebar;
