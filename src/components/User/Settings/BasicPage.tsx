import React, { useState } from 'react';
import cuid from 'cuid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, Divider, Typography } from '@material-ui/core';
import TextInput from '../../Shared/TextInput';
import RadioInput from '../../Shared/RadioInput';
import DateInput from '../../Shared/DateInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    },
    button: {
      marginTop: theme.spacing(1)
    }
  })
);

function BasicPage() {
  const classes = useStyles();
  const [date, setDate] = useState<Date | null>(new Date());
  const [state, setState] = useState({
    displayName: '',
    dob: '',
    gender: '',
    homeTown: ''
  });

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };


  function handleChange(event?: any) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleSubmit(event?: any) {
    event.preventDefault();

    console.log(state);
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Basic</Typography>
      <Divider />
      <form onSubmit={handleSubmit}>
        <TextInput name="displayName" label="Display Name" handleChange={handleChange} />
        <DateInput label="Date" selectedDate={date} handleDateChange={handleDateChange} />
        <RadioInput
          name="gender"
          label="Gender"
          handleChange={handleChange}
          optionsArray={[
            { id: cuid(), label: "Female", value: "female" },
            { id: cuid(), label: "Male", value: "male" }
          ]} />
        <TextInput name="homeTown" label="Home Town" handleChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Save
        </Button>
      </form>
    </Paper>
  )
}

export default BasicPage;
