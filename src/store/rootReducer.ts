import { combineReducers } from 'redux';
import themeReducer from './reducers/themeReducer';
import eventReducer from './reducers/eventReducer';

export default combineReducers({ themeReducer, eventReducer });
