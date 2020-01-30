import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@material-ui/core';
import { setThemeMode } from '../../store/actions/themeActions';

function ThemeSwitcher() {
  const dispatch = useDispatch();
  const { type } = useSelector((state: any) => state.themeReducer);

  function toggleThemeMode() {
    dispatch(setThemeMode(type === 'light' ? 'dark' : 'light'));
  }

  return (
    <Switch edge="end" onClick={toggleThemeMode} checked={type === 'dark'} />
  );
}

export default ThemeSwitcher;
