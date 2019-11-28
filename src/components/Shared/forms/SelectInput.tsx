import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      width: '100%'
    },
    dense: {
      marginTop: theme.spacing(2)
    }
  })
);

function SelectInput(props: any) {
  const classes = useStyles();

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    // @ts-ignore
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const { name, value, optionsArray, label, required, handleChange } = props;

  return (
    <FormControl
      required={required}
      margin="dense"
      variant="outlined"
      className={clsx(classes.formControl, classes.dense)}
    >
      <InputLabel ref={inputLabel} htmlFor="outlined-select">
        {label}
      </InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        renderValue={(value: any) =>
          value.charAt(0).toUpperCase() + value.slice(1)
        }
        input={<OutlinedInput labelWidth={labelWidth} name={name} />}
      >
        {optionsArray.map((option: any) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default SelectInput;