import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Person from '@material-ui/icons/Person';
import AccountBox from '@material-ui/icons/AccountBox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(2)
    },
    title: {
      padding: theme.spacing(1, 2),
      background: 'black',
      color: 'white'
    },
    icon: {
      verticalAlign: 'text-bottom',
      marginRight: theme.spacing(2)
    }
  })
);

function SettingsNav() {
  const classes = useStyles();

  return (
    <Fragment>
      <Paper>
        <Typography className={classes.title} variant="h6">
          <Person className={classes.icon} />
          Profile
        </Typography>
        <List>
          <ListItem button component={Link} to="/settings/basic">
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
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h6">
          <AccountBox className={classes.icon} />
          Account
        </Typography>
        <List>
          <ListItem button component={Link} to="/settings/account">
            <ListItemText primary="My Account" />
          </ListItem>
        </List>
      </Paper>
    </Fragment>
  );
}

export default SettingsNav;
