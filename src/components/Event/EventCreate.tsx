import React from 'react';
import { useDispatch } from 'react-redux';
import EventForm from './EventForm';
import { createEvent } from '../../store/actions/eventActions';

function EventCreate() {
  const dispatch = useDispatch();

  function handleFormSubmit(data: object) {
    dispatch(createEvent(data));
  }

  return <EventForm handleFormSubmit={handleFormSubmit} />;
}

export default EventCreate;
