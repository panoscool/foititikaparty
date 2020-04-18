import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Links from './Links';
import NavbarDropdownMenu from './NavbarDropdownMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    appBar: {
      zIndex: 99,
      boxShadow: 'none'
    },
    link: {
      textDecoration: 'inherit',
      color: 'inherit'
    },
    logo: {
      height: 50,
      verticalAlign: 'text-top',
    }
  })
);

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense">
        <Typography
          noWrap
          variant="h6"
          color="inherit"
          className={classes.grow}
        >
          <Link to="/" className={classes.link}>
            <img
              src="/assets/images/logo.png"
              className={classes.logo}
              alt="logo"
            />
          </Link>
        </Typography>
        <Links />
        <NavbarDropdownMenu />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
