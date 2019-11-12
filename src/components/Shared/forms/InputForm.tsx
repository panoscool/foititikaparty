import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  textField: {
    minWidth: 120,
    width: "100%"
  },
  dense: {
    marginTop: theme.spacing(2)
  }
}));

function InputForm(props: any) {
  const classes = useStyles();

  const {
    name,
    label,
    values,
    placeholder,
    type,
    required,
    multiline,
    rows,
    handleChange,
    inputProps
  } = props;

  return (
    <TextField
      id="outlined-dense"
      margin="dense"
      variant="outlined"
      required={required}
      name={name}
      value={values}
      label={label}
      type={type}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      fullWidth
      inputProps={inputProps}
      onChange={handleChange}
      className={clsx(classes.textField, classes.dense)}
    />
  );
}

export default InputForm;
