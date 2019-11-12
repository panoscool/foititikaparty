import React from 'react';
import Grid from '@material-ui/core/Grid';
import EventList from './EventList';
import sampleData from './sampleData'

function EventPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <EventList events={sampleData.events} />
      </Grid>
      <Grid item xs={12} sm={4}>
        Right side
      </Grid>
    </Grid>
  );
}

export default EventPage;
