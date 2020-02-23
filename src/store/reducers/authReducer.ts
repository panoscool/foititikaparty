import { SIGN_IN, SIGN_OUT } from '../actionTypes';
import { createReducer } from '../../utils/createReducer';

const initialState = {
  authenticated: false,
  displayName: null,
  userId: null,
  photoURL: null,
  providerId: null
}

function loginUser(state: any, payload: any) {
  return {
    ...state,
    authenticated: true,
    userId: payload.uid,
    displayName: payload.displayName,
    photoURL: payload.photoURL,
    providerId: payload.providerData[0].providerId
  }
}

function logoutUser() {
  return { initialState }
}

export default createReducer(initialState, {
  [SIGN_IN]: loginUser,
  [SIGN_OUT]: logoutUser
})
