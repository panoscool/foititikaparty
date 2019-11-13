import React, { Fragment } from 'react';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsChat from './EventDetailsChat';

function EventDetailsPage() {
  return (
    <Fragment>
      <EventDetailsHeader />
      <EventDetailsInfo />
      <EventDetailsChat />
    </Fragment>
  )
}

export default EventDetailsPage;
