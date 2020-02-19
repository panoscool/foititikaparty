import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from '../actionTypes';
import firebase from '../../config/firebase';
import { asyncAction } from '../../utils/asyncAction';

export const createEvent = (event: object) => (dispatch: any) => {
  asyncAction(dispatch, async () => {
    const response = await firebase.firestore().collection('events').add(event);
    console.log(response)
    dispatch({ type: CREATE_EVENT, payload: response })
  })
}

export const updateEvent = (event: object) => ({
  type: UPDATE_EVENT,
  payload: { event }
});

export const deleteEvent = (eventId: string) => ({
  type: DELETE_EVENT,
  payload: { eventId }
});
