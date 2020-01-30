import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from '../actionTypes';
import { createReducer } from '../../utils/createReducer';

const initialState = {
  notifications: []
};

function enqueueSnackbar(state: any, payload: any) {
  return {
    ...state,
    notifications: [
      ...state.notifications,
      {
        ...payload
      }
    ]
  };
}

function removeSnackbar(state: any, payload: any) {
  return {
    ...state,
    notifications: state.notifications.filter(
      // @ts-ignore
      notification => notification.key !== payload.key
    )
  };
}

export default createReducer(initialState, {
  [ENQUEUE_SNACKBAR]: enqueueSnackbar,
  [REMOVE_SNACKBAR]: removeSnackbar
});
