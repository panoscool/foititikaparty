import { combineReducers } from 'redux';
import themeReducer from './reducers/themeReducer';
import authReducer from './reducers/authReducer';
import modalReducer from './reducers/modalReducer';
import asyncReducer from './reducers/asyncReducer';
import notificationReducer from './reducers/notificationReducer'

export default combineReducers({
  themeReducer,
  authReducer,
  modalReducer,
  asyncReducer,
  notificationReducer
});
