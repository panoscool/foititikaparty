import { THEME_MODE } from '../actionTypes';
import { createReducer } from '../../utils/createReducer';

const initialState = { type: 'light' };

function themeMode(state: any, payload: any) {
  return { ...state, type: payload };
}

export default createReducer(initialState, {
  [THEME_MODE]: themeMode
});
