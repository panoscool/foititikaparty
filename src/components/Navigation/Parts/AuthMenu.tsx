import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';

function AuthMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigation = [
    { to: '/event/create', icon: <Add />, label: 'Create Event' },
    { to: '/people', icon: <Event />, label: 'My Events' },
    { to: '/event/create', icon: <People />, label: 'My Network' },
    { to: '/event/create', icon: <Person />, label: 'My Profile' },
    { to: '/settings', icon: <Settings />, label: 'Settings' },
    { to: '/event/create', icon: <ExitToApp />, label: 'Sign out' }
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
        {navigation.map(nav => (
          <MenuItem key={nav.to} component={Link} to={nav.to} onClick={handleClose}>
            <ListItemIcon>{nav.icon}</ListItemIcon>
            {nav.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default AuthMenu;
