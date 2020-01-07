import { THEME_MODE } from '../actionTypes';

const initialState = { type: 'light' };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_MODE:
      return { ...state, type: action.payload };
    default:
      return state;
  }
};

export default reducer;
