import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import TextInput from "../Shared/TextInput";
import SocialAuthPage from "./SocialAuthPage";
import { closeModal } from '../../store/actions/modalActions';
import { loginUser } from '../../store/actions/authActions';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

function LoginModal({ ...other }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    dispatch(loginUser(state));
  };

  return (
    <div>
      <Dialog onClose={() => dispatch(closeModal())} open={true}>
        <DialogTitle>
          Login
        <IconButton aria-label="close" className={classes.closeButton} onClick={() => dispatch(closeModal())}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <TextInput
              required
              type="email"
              name="email"
              label="Email"
              value={state.email}
              handleChange={handleInputChange}
            />
            <TextInput
              required
              type="password"
              name="password"
              label="Password"
              value={state.password}
              handleChange={handleInputChange}
            />

            <Button fullWidth type="submit" color="primary" variant="contained">Login</Button>
          </form>
          <SocialAuthPage />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LoginModal;
