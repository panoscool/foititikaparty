import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from '../actionTypes';
import { asyncAction } from '../../utils/asyncAction';
import { fetchSampleData } from '../../data/mockApi';

export const createEvent = (event: object) => ({
  type: CREATE_EVENT,
  payload: { event }
});

export const updateEvent = (event: object) => ({
  type: UPDATE_EVENT,
  payload: { event }
});

export const deleteEvent = (eventId: string) => ({
  type: DELETE_EVENT,
  payload: { eventId }
});

export const fetchEvents = () => async (dispatch: any) => {
  asyncAction(dispatch, async () => {
    const events = await fetchSampleData();
    dispatch({ type: FETCH_EVENTS, payload: { events } })
  })
}
