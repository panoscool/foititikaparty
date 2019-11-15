import React from 'react';
import { Grid } from '@material-ui/core';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsChat from './EventDetailsChat';

function EventDetailsPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <EventDetailsHeader />
        <EventDetailsInfo />
        <EventDetailsChat />
      </Grid>
      <Grid item xs={12} sm={4}>
        right side
      </Grid>
    </Grid>
  )
}

export default EventDetailsPage;
