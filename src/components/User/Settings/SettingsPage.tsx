import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SettingsNav from './SettingsNav';
import AccountPage from './AccountPage';
import BasicPage from './BasicPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2)
    }
  })
);

function SettingsPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Switch>
            <Redirect exact from='/settings' to='/settings/basics' />
            <Route path='/settings/basic' component={BasicPage} />
            <Route path='/settings/about' />
            <Route path='/settings/photos' />
            <Route path='/settings/account' component={AccountPage} />
          </Switch>
        </Grid>
        <Grid item xs={12} sm={3}><SettingsNav /></Grid>
      </Grid>
    </div>
  )
}

export default SettingsPage;
