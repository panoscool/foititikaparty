import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextInput from "../Shared/TextInput";
import { loginUser } from '../../store/actions/authActions';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2, 0)
  }
}));

function LoginPage() {
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
    dispatch(loginUser(state))
  };

  return (
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

      <Button className={classes.button} fullWidth type="submit" color="primary" variant="contained">Login</Button>
    </form>
  );
}

export default LoginPage;
