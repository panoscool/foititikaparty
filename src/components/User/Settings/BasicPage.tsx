import React, { useState } from 'react';
import cuid from 'cuid';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, Divider, Typography } from '@material-ui/core';
import TextInput from '../../Shared/TextInput';
import RadioInput from '../../Shared/RadioInput';
import DateInput from '../../Shared/DateInput';
import PlaceInput from '../../Shared/PlaceInput';

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
  const [city, setCity] = useState('');
  const [state, setState] = useState({
    displayName: '',
    gender: ''
  });

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  function handleCityChange(city: string) {
    setCity(city);
  }

  function handleChange(event?: any) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleCitySelect(selectedCity: any) {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(() => setCity(selectedCity))
  }

  function handleSubmit(event?: any) {
    event.preventDefault();

    console.log(state, city, date);
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Basic</Typography>
      <Divider />
      <form onSubmit={handleSubmit}>
        <TextInput name="displayName" label="Display Name" value={state.displayName || ''} handleChange={handleChange} />
        <DateInput dateType="date" label="Date of birth" selectedDate={date} handleDateChange={handleDateChange} />
        <RadioInput
          name="gender"
          label="Gender"
          value={state.gender || ''}
          handleChange={handleChange}
          optionsArray={[
            { id: cuid(), label: "Female", value: "female" },
            { id: cuid(), label: "Male", value: "male" }
          ]} />
        <PlaceInput
          label="City"
          value={city || ''}
          options={{ typs: ['(cities)'] }}
          handleChange={handleCityChange}
          handleSelect={handleCitySelect}
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Save
        </Button>
      </form>
    </Paper>
  )
}

export default BasicPage;
