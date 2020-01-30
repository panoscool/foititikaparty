import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from '../actionTypes';

export const enqueueSnackbar = (message: string, variant = 'default') => ({
  type: ENQUEUE_SNACKBAR,
  payload: {
    message,
    options: { variant, key: new Date().getTime() + Math.random() }
  }
});

export const removeSnackbar = (key: string) => ({
  type: REMOVE_SNACKBAR,
  payload: { key }
});
