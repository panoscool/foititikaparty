import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventList from './EventList';
import sampleData from './sampleData';
import EventActivity from './EventActivity';
import SearchField from '../Shared/SearchField';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(2, 0)
  }
}));

function EventPage() {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} sm={8}>
        <div className={classes.margin}>
          <EventList events={sampleData.events} />
        </div>
      </Grid>
      <Grid item xs={12} sm={4}>
        <div className={classes.margin}>
          <SearchField />
        </div>
        <EventActivity />
      </Grid>
    </Grid>
  );
}

export default EventPage;
