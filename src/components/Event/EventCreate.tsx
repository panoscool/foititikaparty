import React from 'react';
import EventForm from './EventForm';

function EventCreate() {
  function handleFormSubmit(data: object) {
    console.log(data)
  }

  return (
    <EventForm handleFormSubmit={handleFormSubmit} />
  )
}

export default EventCreate;
