import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  spacing: {
    display: 'block',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(3)
  }
}));

interface Props {
  events: Record<string, any>
}

function EventList({ events }: Props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {events.map((event: any) => (
        <ListItem key={event.id} divider alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="avatar" src={event.hostPhotoURL} />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="h6">{event.title}</Typography>}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {event.hostedBy}
                </Typography>
                {' — Mon 01 Dec 2019 at 22:00'}
                <Typography
                  component='span'
                  variant="body2"
                  className={classes.spacing}
                  color="textPrimary"
                >
                  {event.description}
                </Typography>
                {`Attendees: ${event.attendees.length}`}
              </React.Fragment>
            }
          />
          <ListItemSecondaryAction>
            <Button component={Link} to={`/event/${event.id}`} variant="outlined" color="primary">
              View
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default EventList;
