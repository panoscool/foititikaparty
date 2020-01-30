import { combineReducers } from 'redux';
import themeReducer from './reducers/themeReducer';
import authReducer from './reducers/authReducer';
import eventReducer from './reducers/eventReducer';
import modalReducer from './reducers/modalReducer';
import notificationReducer from './reducers/notificationReducer'
import asyncReducer from './reducers/asyncReducer';

export default combineReducers({
  themeReducer,
  authReducer,
  eventReducer,
  modalReducer,
  notificationReducer,
  asyncReducer
});
