import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsSidebar from './EventDetailsSidebar';

function EventDetailsPage() {
  const { id } = useParams();
  const event = useSelector((state: any) => state.eventReducer);

  // @ts-ignore
  const data = event[id - 1];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={8}>
        <EventDetailsHeader data={data} />
        <EventDetailsInfo data={data} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <EventDetailsSidebar data={data} />
      </Grid>
    </Grid>
  );
}

export default EventDetailsPage;
