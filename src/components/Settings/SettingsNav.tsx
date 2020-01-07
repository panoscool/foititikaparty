import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    title: {
      padding: theme.spacing(1, 2),
      background: 'black',
      color: 'white'
    }
  })
);

function SettingsNav() {
  const classes = useStyles();

  return (
    <Paper>
      <Typography className={classes.title} variant="h6">
        Text only
      </Typography>
      <List>
        <ListItem button component={Link} to="/settings/basics">
          <ListItemText primary="Basics" />
        </ListItem>
        <ListItem button component={Link} to="/settings/about">
          <ListItemText primary="About me" />
        </ListItem>
        <ListItem button component={Link} to="/settings/photos">
          <ListItemText primary="My photos" />
        </ListItem>
      </List>
    </Paper>
  );
}

export default SettingsNav;
