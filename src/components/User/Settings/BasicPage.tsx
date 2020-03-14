import React, { useState, useEffect, useContext } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, Divider, Typography } from '@material-ui/core';
import TextInput from '../../Shared/TextInput';
import RadioInput from '../../Shared/RadioInput';
import DateInput from '../../Shared/DateInput';
import PlaceInput from '../../Shared/PlaceInput';
import Spinner from '../../Shared/Spinner';
import useNotifier from '../../../hooks/useNotifier';
import { AuthContext } from '../../../context/AuthContext';
import firebase from '../../../config/firebase';

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
  const notification = useNotifier()
  const { userId } = useContext(AuthContext);
  const [date, setDate] = useState<Date | null>(new Date());
  const [city, setCity] = useState('');
  const [values, setValues] = useState({
    displayName: '',
    gender: ''
  });
  const [state, setState] = useState({
    loading: true,
    error: ''
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (!userId) return;

        const doc = await firebase.firestore().collection('users').doc(userId).get();
        const d = doc.data();

        setDate(d?.date.toDate());
        setCity(d?.city);
        setValues({ displayName: d?.displayName, gender: d?.gender });
        setState({ loading: false, error: '' })
      } catch (err) {
        console.error(err.message)
        setState({ loading: false, error: err.message })
      }
    }

    fetchProfile();

  }, [userId])

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  function handleCityChange(city: string) {
    setCity(city);
  }

  function handleChange(event?: any) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleCitySelect(selectedCity: any) {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(() => setCity(selectedCity))
  }

  async function handleSubmit(event?: any) {
    event.preventDefault();
    const updatedProfile = {
      ...values,
      date,
      city
    }

    try {
      await firebase.firestore().collection('users').doc(userId).update(updatedProfile);
      notification('Your profile has been updated', 'success')
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Basic</Typography>
      <Divider />
      {state.loading ? <Spinner /> :
        <form onSubmit={handleSubmit}>
          <TextInput name="displayName" label="Display Name" value={values.displayName || ''} handleChange={handleChange} />
          <DateInput dateType="date" label="Date of birth" selectedDate={date} handleDateChange={handleDateChange} />
          <RadioInput
            name="gender"
            label="Gender"
            value={values.gender || ''}
            handleChange={handleChange}
            optionsArray={[
              { label: "Female", value: "female" },
              { label: "Male", value: "male" }
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
        </form>}
    </Paper>
  )
}

export default BasicPage;
