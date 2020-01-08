import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from '../actionTypes';

export const createEvent = (event: object) => ({
  type: CREATE_EVENT,
  payload: event
});

export const updateEvent = (event: object) => ({
  type: UPDATE_EVENT,
  payload: event
});

export const deleteEvent = (eventId: string) => ({
  type: DELETE_EVENT,
  payload: eventId
});
