import React, { useState, useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography, Paper, Divider } from '@material-ui/core';
import TextInput from '../../Shared/TextInput';
import firebase from '../../../config/firebase';
import useNotifier from '../../../hooks/useNotifier';
import { AuthContext } from '../../../context/AuthContext';

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
  const notification = useNotifier();
  const { providerId } = useContext(AuthContext);
  const [values, setValues] = useState({
    newPassword1: '',
    newPassword2: ''
  });

  function handleChange(event?: any) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event?: any) {
    event.preventDefault();
    const user = firebase.auth().currentUser;

    try {
      await user?.updatePassword(values.newPassword1);
      setValues({ newPassword1: '', newPassword2: '' });
      notification('Your [password has been updated', 'success');
    } catch (err) {
      console.error(err.message);
    }
  }

  const disabledBtn =
    !values.newPassword1.trim() || !values.newPassword2.trim();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Account</Typography>
      <Divider />
      <Typography color="secondary">CHANGE PASSWORD</Typography>
      <Typography variant="body2">
        Use the form to change your account password.
      </Typography>
      {providerId && providerId === 'password' && (
        <form onSubmit={handleSubmit}>
          <TextInput
            type='password'
            name="newPassword1"
            label="New Password"
            value={values.newPassword1}
            handleChange={handleChange}
          />
          <TextInput
            type='password'
            name="newPassword2"
            label="Confirm Password"
            value={values.newPassword2}
            handleChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={disabledBtn}
            className={classes.button}
          >
            Update Password
          </Button>
        </form>
      )}

      {providerId && providerId === 'facebook.com' && (
        <Button color="primary" variant="contained">
          Go to Facebook
        </Button>
      )}

      {providerId && providerId === 'google.com' && (
        <Button color="primary" variant="contained">
          Go to Google
        </Button>
      )}
    </Paper>
  );
}

export default AccountPage;
