import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Add from '@material-ui/icons/Add';
import Event from '@material-ui/icons/Event';
import People from '@material-ui/icons/People';
import Person from '@material-ui/icons/Person';
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { openModal } from '../../../store/actions/modalActions';

function AuthMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: any) => state.authReducer);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  };

  function onClose(modal: any) {
    setAnchorEl(null);
    dispatch(openModal(modal));
  }

  const navigationGuest = [
    { click: 'LoginModal', label: 'Login' },
    { click: 'RegisterModal', label: 'Register' }
  ]

  const navigationAuth = [
    { to: '/event/create', icon: <Add />, label: 'Create Event' },
    { to: '/profile/events', icon: <Event />, label: 'My Events' },
    { to: '/profile/network', icon: <People />, label: 'My Network' },
    { to: '/profile', icon: <Person />, label: 'My Profile' },
    { to: '/settings', icon: <Settings />, label: 'Settings' },
    { to: '/signout', icon: <ExitToApp />, label: 'Sign out' }
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
        <AccountCircle />
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
        {authenticated ? navigationAuth.map((nav: any) => (
          <MenuItem
            key={nav.to}
            component={Link}
            to={nav.to}
            onClick={handleClose}
          >
            <ListItemIcon>{nav.icon}</ListItemIcon>
            {nav.label}
          </MenuItem>
        )) : navigationGuest.map((nav: any) => (
          <MenuItem key={nav.label} onClick={() => onClose(nav.click)}>
            {nav.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default AuthMenu;
