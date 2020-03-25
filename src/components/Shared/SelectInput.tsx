import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    minWidth: 120,
    width: '100%'
  },
  dense: {
    marginTop: theme.spacing(2)
  }
})
);

interface Props {
  name: string;
  label: string;
  value?: string;
  optionsArray: any;
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  handleChange: (e?: any) => void;
}

function SelectInput(props: Props) {
  const classes = useStyles();

  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const { name, label, value, optionsArray, multiple, required, disabled, handleChange } = props;

  return (
    <FormControl
      margin="dense"
      variant="outlined"
      required={required}
      disabled={disabled}
      className={clsx(classes.formControl, classes.dense)}
    >
      <InputLabel ref={inputLabel} htmlFor="outlined-select">
        {label}
      </InputLabel>
      <Select
        value={value}
        multiple={multiple}
        onChange={handleChange}
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
