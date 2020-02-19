import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextInput from '../../Shared/TextInput';
import { Button, Typography, Paper, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    },
    button: {
      marginTop: theme.spacing(1)
    }
  })
);

function AccountPage() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Account</Typography>
      <Divider />
      <Typography color="secondary">CHANGE PASSWORD</Typography>
      <Typography variant="body2">
        Use the form to change your account password.
      </Typography>
      <form>
        <TextInput label="New Password" />
        <TextInput label="Confirm Password" />
        <Button variant="contained" color="primary" className={classes.button}>
          Update Password
        </Button>
      </form>
    </Paper>
  );
}

export default AccountPage;
