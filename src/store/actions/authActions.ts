import { SIGN_IN, SIGN_OUT } from '../actionTypes';
import { closeModal } from './modalActions';

export const registerUser = (creds: any) => ({
  type: SIGN_IN,
  payload: { creds }
})

export const loginUser = (creds: any) => async (dispatch: any) => {
  dispatch({ type: SIGN_IN, payload: { creds } });
  dispatch(closeModal());
}

export const logoutUser = () => ({
  type: SIGN_OUT
})
