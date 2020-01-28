import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextInput from "../Shared/TextInput";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2, 0)
  }
}));

function RegisterPage() {
  const classes = useStyles();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleInputChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        required
        type="text"
        name="name"
        label="Display Name"
        value={state.name}
        handleChange={handleInputChange}
      />
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

      <Button className={classes.button} fullWidth type="submit" color="primary" variant="contained">Register</Button>
    </form>
  );
}

export default RegisterPage;
