import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventList from './EventList';
import EventActivity from './EventActivity';
import SearchField from '../Shared/SearchField';
import Spinner from '../Shared/Spinner';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    spacing: {
      margin: theme.spacing(2)
    },
    search: {
      marginBottom: theme.spacing(1)
    }
  })
);

function EventPage() {
  const classes = useStyles();
  const { loading } = useSelector((state: any) => state.asyncReducer);

  const event = useSelector((state: any) => state.eventReducer);

  return (
    <div className={classes.spacing}>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={8}>
          <div className={classes.search}>
            <SearchField />
          </div>
          {loading ? <Spinner /> : event.map((event: any) => (
            <EventList key={event.id} {...event} />
          ))}
        </Grid>
        <Grid item xs={12} sm={4}>
          <EventActivity />
        </Grid>
      </Grid>
    </div>
  );
}

export default EventPage;
