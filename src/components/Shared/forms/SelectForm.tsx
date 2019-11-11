import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    width: "100%"
  },
  dense: {
    marginTop: theme.spacing(2)
  }
}));

function SimpleSelect(props) {
  const classes = useStyles();

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const { name, values, optionsArray, label, required, handleChange } = props;

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
        value={values}
        onChange={handleChange}
        renderValue={value => value.charAt(0).toUpperCase() + value.slice(1)}
        input={
          <OutlinedInput
            labelWidth={labelWidth}
            name={name}
            id="outlined-select"
          />
        }
      >
        {optionsArray.map(obj => {
          return (
            <MenuItem key={obj.key} value={obj.value}>
              {obj.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default SimpleSelect;
