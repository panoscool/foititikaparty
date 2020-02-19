import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from '../actionTypes';
import { createReducer } from '../../utils/createReducer';

const initialState = {
  event: {},
  events: []
}

function createEvent(state: any, payload: any) {
  return [...state, payload.event];
}

function updateEvent(state: any, payload: any) {
  return [
    ...state.filter((event: any) => event.id !== payload.event.id),
    payload.event
  ];
}

function deleteEvent(state: any, payload: any) {
  return [...state.filter((event: any) => event.id !== payload.event)];
}

function fetchEvents(state: any, payload: any) {
  return { ...state, events: payload }
}

// @ts-ignore
export default createReducer(initialState, {
  [CREATE_EVENT]: createEvent,
  [UPDATE_EVENT]: updateEvent,
  [DELETE_EVENT]: deleteEvent,
  [FETCH_EVENTS]: fetchEvents
});
