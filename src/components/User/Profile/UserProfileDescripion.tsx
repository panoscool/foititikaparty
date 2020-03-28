import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0)
  }
})
);

function UserProfileDescription() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>UserProfileDescription</Paper>
  )
}

export default UserProfileDescription;
