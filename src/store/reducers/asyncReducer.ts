import { ASYNC_ACTION_START, ASYNC_ACTION_FINISH, ASYNC_ACTION_ERROR } from '../actionTypes';
import { createReducer } from '../../utils/createReducer';

const initialState = {
  loading: false,
  element: null,
  error: null
}

const asyncActionStart = (state: any, payload: any) => {
  return { ...state, loading: true, element: payload }
}

const asyncActionFinish = (state: any) => {
  return { ...state, loading: false }
}

const asyncActionError = (state: any, payload: any) => {
  return { ...state, loading: false, error: payload.error }
}

export default createReducer(initialState, {
  [ASYNC_ACTION_START]: asyncActionStart,
  [ASYNC_ACTION_FINISH]: asyncActionFinish,
  [ASYNC_ACTION_ERROR]: asyncActionError
})
