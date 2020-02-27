import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Hidden, Button } from '@material-ui/core';
import { Event, People } from '@material-ui/icons';

interface Props {
  navType?: string;
}

const navigation = [
  { to: '/', label: 'Events', icon: <Event /> },
  { to: '/people', label: 'People', icon: <People /> }
];

function MenuLinks({ navType }: Props) {
  let { pathname } = useLocation();

  if (navType === 'bottomNavigation') {
    return (
      <BottomNavigation showLabels value={pathname}>
        {navigation.map(nav => (
          <BottomNavigationAction key={`bottom-${nav.to}`} label={nav.label} value={nav.to} icon={nav.icon} component={Link} to={nav.to} />
        ))}
      </BottomNavigation>
    );
  }
  return (
    <Fragment>
      <Hidden smDown implementation="css">
        {navigation.map(nav => (
          <Button color="inherit" key={`top-${nav.to}`} component={Link} to={nav.to}>
            {nav.label}
          </Button>
        ))}
      </Hidden>
    </Fragment>
  );
}

export default MenuLinks;
