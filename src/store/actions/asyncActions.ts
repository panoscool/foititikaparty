import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from '../actionTypes';

export const asyncActionStart = (name?: string) => ({
  type: ASYNC_ACTION_START,
  payload: name
});

export const asyncActionFinish = () => ({
  type: ASYNC_ACTION_FINISH
});

export const asyncActionError = (error?: any) => ({
  type: ASYNC_ACTION_ERROR,
  payload: { error }
});
