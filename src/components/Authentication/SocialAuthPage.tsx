import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import firebase from '../../config/firebase';
import { ThemeContext } from '../../context/ThemeContext';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    margin: theme.spacing(2, 0)
  },
  button: {
    margin: theme.spacing(1, 0)
  }
}));

function SocialAuthPage() {
  const classes = useStyles();
  const { handleModal } = useContext(ThemeContext);

  async function handleSocialAuth(selectedProvider: string) {
    const auth = firebase.auth();
    const provider = {
      facebook: new firebase.auth.FacebookAuthProvider(),
      google: new firebase.auth.GoogleAuthProvider()
    };

    handleModal();
    // @ts-ignore
    await auth.signInWithPopup(provider[selectedProvider]);
  }

  return (
    <div className={classes.root}>
      <Typography>- OR -</Typography>
      <Button onClick={() => handleSocialAuth('facebook')} className={classes.button} fullWidth color="primary" variant="outlined">Continue with Facebook</Button>
      <Button onClick={() => handleSocialAuth('google')} className={classes.button} fullWidth color="default" variant="outlined">Continue with Google</Button>
    </div>
  );
}

export default SocialAuthPage;
