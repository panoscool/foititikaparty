import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EventForm from './EventForm';
import { createEvent, updateEvent } from '../../store/actions/eventActions';

function ManageEvent() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const events = useSelector((state: any) => state.eventReducer);

  // @ts-ignore
  const data = events[id - 1] || {};

  function handleFormSubmit(data: object) {
    if (id) {
      dispatch(updateEvent(data));
    }
    dispatch(createEvent(data));
  }

  return <EventForm data={data || {}} handleFormSubmit={handleFormSubmit} />;
}

export default ManageEvent;
