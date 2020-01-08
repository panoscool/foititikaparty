import { THEME_MODE } from '../actionTypes';

export const setThemeMode = (mode: string) => ({
  type: THEME_MODE,
  payload: mode
});
