import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Home, Edit, Search } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const navigation = [
  { to: '/', label: 'Home', icon: <Home /> },
  { to: '/search', label: 'Search', icon: <Search /> },
  { to: '/event/create', label: 'Create Event', icon: <Edit /> }
];

interface Props {
  handleDrawerToggle: () => void;
}

function DrawerMenu(handleDrawerToggle: Props) {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list"
      className={classes.root}
    >
      {navigation.map(nav => (
        <ListItem
          button
          component={Link}
          to={nav.to}
          key={nav.to}
          onClick={handleDrawerToggle}
        >
          <ListItemIcon>{nav.icon}</ListItemIcon>
          <ListItemText primary={nav.label} />
        </ListItem>
      ))}
    </List>
  );
}
export default DrawerMenu;
