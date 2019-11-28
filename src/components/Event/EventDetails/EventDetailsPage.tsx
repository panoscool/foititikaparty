import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsChat from './EventDetailsChat';
import EventDetailsSidebar from './EventDetailsSidebar';
import sampleData from '../sampleData';

function EventDetailsPage() {
  const { id } = useParams();

  const data = sampleData[id - 1];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={8}>
        <EventDetailsHeader data={data} />
        <EventDetailsInfo data={data} />
        <EventDetailsChat />
      </Grid>
      <Grid item xs={12} sm={4}>
        <EventDetailsSidebar data={data} />
      </Grid>
    </Grid>
  );
}

export default EventDetailsPage;
