import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Hidden, Button } from '@material-ui/core';

const navigation = [
  { to: '/search', label: 'Search' },
  { to: '/event/create', label: 'Create Event' },
  { to: '/auth', label: 'Auth' }
];

function MenuLinks() {
  return (
    <Fragment>
      <Hidden smDown implementation="css">
        {navigation.map(nav => (
          <Button color="inherit" key={nav.to} component={Link} to={nav.to}>
            {nav.label}
          </Button>
        ))}
      </Hidden>
    </Fragment>
  );
}

export default MenuLinks;
