import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(2)
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row'
  },
  radioGroupVertical: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

interface Props {
  name: string;
  label: string;
  value?: string;
  vertical?: string;
  optionsArray: any;
  required?: boolean;
  disabled?: boolean;
  handleChange: (e?: any) => void;
}

function RadioInput(props: Props) {
  const classes = useStyles();

  const {
    name,
    label,
    value,
    optionsArray,
    required,
    disabled,
    vertical,
    handleChange
  } = props;

  return (
    <div className={classes.root}>
      <FormControl required={required} component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          name={name}
          value={value}
          onChange={handleChange}
          className={vertical ? classes.radioGroupVertical : classes.radioGroup}
        >
          {optionsArray.map((option: any) => (
            <FormControlLabel
              key={option.value}
              disabled={disabled}
              label={option.label}
              value={option.value}
              control={<Radio required={required} color="primary" />}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RadioInput;
