import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Hidden, Drawer, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';
import MenuLinks from './Parts/MenuLinks';
import DrawerMenu from './Parts/DrawerMenu';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    background: '#212121'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  link: {
    textDecoration: 'inherit',
    color: 'inherit'
  },
  logo: {
    height: 50
  }
}));

function Navbar() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Fragment>
      <CssBaseline />

      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open-drawer'
            onClick={handleDrawerToggle}
            className={classes.navIconHide}
          >
            <Menu />
          </IconButton>
          <Typography
            variant='h6'
            color='inherit'
            className={classes.grow}
            noWrap
          >
            <Link to='/' className={classes.link}>
              <img src='/assets/images/logo.png' className={classes.logo} alt='logo' />
            </Link>
          </Typography>
          <MenuLinks />
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          <DrawerMenu handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </Hidden>
    </Fragment>
  );
}

export default withRouter(Navbar);
