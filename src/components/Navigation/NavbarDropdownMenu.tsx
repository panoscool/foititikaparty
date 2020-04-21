import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import Add from '@material-ui/icons/Add';
import Event from '@material-ui/icons/Event';
import People from '@material-ui/icons/People';
import Person from '@material-ui/icons/Person';
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import firebase from '../../config/firebase';

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  }
}));

function AuthMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { handleModal } = useContext(ThemeContext);
  const { authenticated, userId, photoURL, displayName } = useContext(AuthContext);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  async function handleClose(loc: string) {
    if (loc === '/') {
      setAnchorEl(null);
      await firebase.auth().signOut();
    } else {
      setAnchorEl(null);
    }
  }

  function onClose(modal: any) {
    setAnchorEl(null);
    // @ts-ignore
    handleModal(modal);
  }

  function renderAvatar() {
    if (authenticated && photoURL) {
      return <Avatar className={classes.small} alt={displayName} src={photoURL} />;
    } else if (authenticated && !photoURL) {
      return <Avatar className={classes.small} alt={displayName} src='/assets/images/user.png' />;
    } else {
      return <AccountCircle />;
    }
  }

  const navigationGuest = [
    { modal: 'LoginModal', label: 'Login' },
    { modal: 'RegisterModal', label: 'Register' }
  ];

  const navigationAuth = [
    { to: '/event/create', icon: <Add />, label: 'Create Event' },
    { to: '/profile/events', icon: <Event />, label: 'My Events' },
    { to: '/profile/network', icon: <People />, label: 'My Network' },
    { to: `/profile/${userId}`, icon: <Person />, label: 'My Profile' },
    { to: '/settings', icon: <Settings />, label: 'Settings' },
    { to: '/', icon: <ExitToApp />, label: 'Sign out' }
  ];

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {renderAvatar()}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
      >
        {authenticated
          ? navigationAuth.map((nav: any) => (
            <MenuItem
              key={nav.to}
              component={Link}
              to={nav.to}
              onClick={() => handleClose(nav.to)}
            >
              <ListItemIcon>{nav.icon}</ListItemIcon>
              {nav.label}
            </MenuItem>
          ))
          : navigationGuest.map((nav: any) => (
            <MenuItem key={nav.label} onClick={() => onClose(nav.modal)}>
              {nav.label}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}

export default AuthMenu;
