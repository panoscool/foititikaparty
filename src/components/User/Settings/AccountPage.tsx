import React, { useState, useContext, Fragment } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextInput from '../../Shared/TextInput';
import firebase from '../../../config/firebase';
import useNotifier from '../../../hooks/useNotifier';
import { AuthContext } from '../../../context/AuthContext';

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    margin: theme.spacing(2, 0)
  }
})
);

function AccountPage() {
  const classes = useStyles();
  const notification = useNotifier();
  const { providerId } = useContext(AuthContext);
  const [error, setError] = useState('');
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
      setError(err.message);
    }
  }

  const disabledBtn = !values.newPassword1.trim() || !values.newPassword2.trim();

  return (
    <Fragment>
      <Typography color="secondary">CHANGE PASSWORD</Typography>
      <Typography variant="body2">Use the form to change your account password.</Typography>
      <Typography color="error" variant="subtitle2">{error && error}</Typography>
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
        <Button color="primary" variant="contained" className={classes.button}>
          Go to Facebook
        </Button>
      )}

      {providerId && providerId === 'google.com' && (
        <Button color="primary" variant="contained" className={classes.button}>
          Go to Google
        </Button>
      )}
    </Fragment>
  );
}

export default AccountPage;
