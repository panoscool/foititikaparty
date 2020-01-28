import { SIGN_IN, SIGN_OUT } from '../actionTypes';
import { createReducer } from '../../utils/createReducer';

const initialState = {
  authenticated: false,
  user: null
}

function loginUser(state: any, payload: any) {
  return { authenticated: true, user: payload.creds.email }
}

function logoutUser() {
  return { authenticated: false, user: null }
}

export default createReducer(initialState, {
  [SIGN_IN]: loginUser,
  [SIGN_OUT]: logoutUser
})
