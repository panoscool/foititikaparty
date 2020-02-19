import { SIGN_IN, SIGN_OUT } from '../actionTypes';
import { createReducer } from '../../utils/createReducer';

const initialState = {
  authenticated: false,
  displayName: null,
  userId: null,
  photoURL: null
}

function loginUser(state: any, payload: any) {
  return {
    ...state,
    authenticated: true,
    userId: payload.uid,
    displayName: payload.displayName,
    photoURL: payload.photoURL
  }
}

function logoutUser() {
  return { initialState }
}

export default createReducer(initialState, {
  [SIGN_IN]: loginUser,
  [SIGN_OUT]: logoutUser
})
