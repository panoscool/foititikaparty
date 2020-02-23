import history from '../../history';
import firebase from '../../config/firebase';
import { asyncAction } from '../../utils/asyncAction';
import { enqueueSnackbar } from './notificationActions';

export const createEvent = (event: object) => (dispatch: any) => {
  asyncAction(dispatch, async () => {
    const response = await firebase.firestore().collection('events').add(event);

    history.push(`/event/${response.id}`);
    dispatch(enqueueSnackbar('Event has been created', 'success'))
  })
}

export const updateEvent = (eventId: string, event: object) => (dispatch: any) => {
  asyncAction(dispatch, async () => {
    await firebase.firestore().collection('events').doc(eventId).update(event);

    history.push(`/event/${eventId}`);
    dispatch(enqueueSnackbar('Event has been updated', 'success'))
  })
};

export const deleteEvent = (eventId: string | undefined) => (dispatch: any) => {
  asyncAction(dispatch, async () => {
    await firebase.firestore().collection('events').doc(eventId).delete();

    history.push('/');
    dispatch(enqueueSnackbar('Event has been deleted', 'success'))
  })
};
