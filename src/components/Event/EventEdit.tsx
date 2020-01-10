import React from 'react';
import { useDispatch } from 'react-redux';
import EventForm from './EventForm';
import { updateEvent } from '../../store/actions/eventActions';

function EventEdit() {
  const dispatch = useDispatch();

  function handleFormSubmit(data: object) {
    dispatch(updateEvent(data))
  }

  return (
    <EventForm handleFormSubmit={handleFormSubmit} />
  )
}

export default EventEdit;
