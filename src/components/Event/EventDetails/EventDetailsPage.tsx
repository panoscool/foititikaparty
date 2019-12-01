import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsSidebar from './EventDetailsSidebar';
import sampleData from '../sampleData.json';
import ImageInput from '../../Shared/ImageInput';

function EventDetailsPage() {
  const { id } = useParams();

  // @ts-ignore
  const data = sampleData[id - 1];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={8}>
        <ImageInput />
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
