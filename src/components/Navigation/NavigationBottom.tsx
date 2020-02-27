import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import Links from './Links';

const useStyles = makeStyles(theme => ({
  bottomNavigationWrapper: {
    left: 0,
    right: 0,
    bottom: 0,
    position: 'fixed',
    zIndex: 1,
    paddingBottom: 'env(safe-area-inset-bottom)'
  }
}));

function NavigationBottom() {
  const classes = useStyles();

  return (
    <div className={classes.bottomNavigationWrapper}>
      <Hidden mdUp>
        <Links navType="bottomNavigation" />
      </Hidden>
    </div>
  );
}

export default NavigationBottom;
