import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import TextInput from "../Shared/TextInput";
import SocialAuthPage from "./SocialAuthPage";
import { ThemeContext } from '../../context/ThemeContext';
import firebase from '../../config/firebase';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

function RegisterModal() {
  const classes = useStyles();
  const { handleModal } = useContext(ThemeContext);
  const [values, setValues] = useState({
    displayName: "",
    email: "",
    password: ""
  });

  const handleInputChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    const { displayName, email, password } = values;

    try {
      const createdUser = await firebase.auth().createUserWithEmailAndPassword(email, password);

      await createdUser.user?.updateProfile({ displayName });

      const newUser = {
        displayName: displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }

      await firebase.firestore().collection('users').doc(createdUser.user?.uid).set(newUser)
      handleModal();
    } catch (err) {
      console.error(err.message)
    }
  };

  return (
    <Dialog onClose={handleModal} open={true}>
      <DialogTitle>
        Register
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleModal}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextInput
            required
            type="text"
            name="displayName"
            label="Display Name"
            value={values.displayName}
            handleChange={handleInputChange}
          />
          <TextInput
            required
            type="email"
            name="email"
            label="Email"
            value={values.email}
            handleChange={handleInputChange}
          />
          <TextInput
            required
            type="password"
            name="password"
            label="Password"
            value={values.password}
            handleChange={handleInputChange}
          />

          <Button fullWidth type="submit" color="primary" variant="contained">Register</Button>
        </form>
        <SocialAuthPage />
      </DialogContent>
    </Dialog>
  );
}

export default RegisterModal;
