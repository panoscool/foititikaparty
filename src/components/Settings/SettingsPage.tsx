import React from 'react';
import Grid from '@material-ui/core/Grid';
import SettingsNav from './SettingsNav';
import { Route, Redirect } from 'react-router-dom';

function SettingsPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={9}>
        <Redirect exact from='settings' to='/settings/basics' />
        <Route path='/settings/basic' />
        <Route path='/settings/about' />
        <Route path='/settings/photos' />
        <Route path='/settings/account' />
      </Grid>
      <Grid item xs={12} sm={3}><SettingsNav /></Grid>
    </Grid>
  )
}

export default SettingsPage;
