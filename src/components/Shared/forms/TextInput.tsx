import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      minWidth: 120,
      width: '100%'
    },
    dense: {
      marginTop: theme.spacing(2)
    }
  })
);

function InputInput(props: any) {
  const classes = useStyles();

  const { handleChange, inputProps, ...rest } = props;

  return (
    <TextField
      id="outlined-dense"
      margin="dense"
      variant="outlined"
      fullWidth
      {...rest}
      inputProps={inputProps}
      onChange={handleChange}
      className={clsx(classes.textField, classes.dense)}
    />
  );
}

export default InputInput;
