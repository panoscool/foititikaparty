import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Home, Edit, Event, People } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

const navigation = [
  { to: '/', label: 'Home', icon: <Home /> },
  { to: '/events', label: 'Events', icon: <Event /> },
  { to: '/people', label: 'People', icon: <People /> },
  { to: '/event/create', label: 'Create Event', icon: <Edit /> }
];

interface Props {
  handleDrawerToggle: () => void;
}

function DrawerMenu({ handleDrawerToggle }: Props) {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list"
      className={classes.root}
    >
      {navigation.map(nav => {
        return (<ListItem button key={nav.to} component={Link} to={nav.to} onClick={handleDrawerToggle}>
          <ListItemIcon>{nav.icon}</ListItemIcon>
          <ListItemText primary={nav.label} />
        </ListItem>);
      })}
    </List>
  );
}
export default DrawerMenu;
