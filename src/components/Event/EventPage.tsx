import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventList from './EventList';
import EventActivity from './EventActivity';
import SearchField from '../Shared/SearchField';
import PlaceInput from '../Shared/forms/PlaceInput';
import sampleData from './sampleData.json';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    spacing: {
      margin: theme.spacing(2)
    },
    search: {
      marginBottom: theme.spacing(2)
    }
  })
);

function EventPage() {
  const classes = useStyles();

  return (
    <div className={classes.spacing}>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={8}>
          <EventList events={sampleData} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.search}>
            <SearchField />
          </div>
          <EventActivity />
        </Grid>
      </Grid>
      <PlaceInput />
    </div>
  );
}

export default EventPage;
