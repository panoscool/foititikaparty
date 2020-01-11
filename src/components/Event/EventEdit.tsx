import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EventForm from './EventForm';
import { updateEvent } from '../../store/actions/eventActions';

function EventEdit() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const events = useSelector((state: any) => state.eventReducer);

  let data = {};
  if (id && events.length > 0) {
    //@ts-ignore
    data = events[id - 1] || {};
  }

  function handleFormSubmit(data: object) {
    dispatch(updateEvent(data));
  }

  return <EventForm data={data} handleFormSubmit={handleFormSubmit} />;
}

export default EventEdit;
