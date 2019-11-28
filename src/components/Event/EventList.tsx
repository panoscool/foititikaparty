import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

interface Props {
  events: Record<string, any>;
}

function EventList({ events }: Props) {
  const classes = useStyles();

  return (
    <Paper>
      <List className={classes.root}>
        {events.map((event: any) => (
          <ListItem
            key={event.id}
            button
            divider
            component={Link}
            to={`/event/${event.id}`}
            alignItems="flex-start"
          >
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
                  {` — ${event.date}`}
                  <Typography
                    component="span"
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
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default EventList;
