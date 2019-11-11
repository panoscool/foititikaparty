import React from 'react';
import Grid from '@material-ui/core/Grid';

function EventPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>Left side</Grid>
      <Grid item xs={12} sm={4}>Right side</Grid>
    </Grid>
  )
}

export default EventPage;
