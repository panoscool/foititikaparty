import React, { useState, useEffect, useContext } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, Divider, Typography } from '@material-ui/core';
import TextInput from '../../Shared/TextInput';
import RadioInput from '../../Shared/RadioInput';
import PlaceInput from '../../Shared/PlaceInput';
import Spinner from '../../Shared/Spinner';
import { AuthContext } from '../../../context/AuthContext';
import firebase from '../../../config/firebase';
import SelectInput from '../../Shared/SelectInput';

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

const interests = [
  { label: 'Drinks', value: 'drinks' },
  { label: 'Food', value: 'food' },
  { label: 'Film', value: 'film' },
  { label: 'Music', value: 'music' },
  { label: 'Culture', value: 'culture' },
  { label: 'Travel', value: 'travel' }
];

function AboutPage() {
  const classes = useStyles();
  const { userId } = useContext(AuthContext);
  const [country, setCountry] = useState('');
  const [values, setValues] = useState({
    status: '',
    about: '',
    interests: [],
    ocupation: ''
  });
  const [state, setState] = useState({
    loading: true,
    error: ''
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (!userId) return;

        const doc = await firebase
          .firestore()
          .collection('users')
          .doc(userId)
          .get();
        const d = doc.data();

        setCountry(d?.country)
        setValues({ status: d?.status, about: d?.about, interests: d?.interests, ocupation: d?.ocupation })
        setState({ loading: false, error: '' });
      } catch (err) {
        console.error(err.message);
        setState({ loading: false, error: err.message });
      }
    }

    fetchProfile();
  }, [userId]);

  function handleCityChange(country: string) {
    setCountry(country);
  }

  function handleChange(event?: any) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleCitySelect(selectedCountry: any) {
    geocodeByAddress(selectedCountry)
      .then(results => getLatLng(results[0]))
      .then(() => setCountry(selectedCountry));
  }

  async function handleSubmit(event?: any) {
    event.preventDefault();
    const updatedProfile = {
      ...values,
      country
    };

    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .update(updatedProfile);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">About me</Typography>
      <Divider />
      {state.loading ? (
        <Spinner />
      ) : (
          <form onSubmit={handleSubmit}>
            <RadioInput
              name="status"
              label="Your status"
              value={values.status || ''}
              handleChange={handleChange}
              optionsArray={[
                { label: 'Single', value: 'single' },
                { label: 'Relationship', value: 'relationship' },
                { label: 'Married', value: 'married' }
              ]}
            />
            <TextInput
              name="about"
              label="About me"
              multiline
              rows="6"
              value={values.about || ''}
              handleChange={handleChange}
            />
            <SelectInput
              name="interests"
              label="Interests"
              multiple
              optionsArray={interests}
              // @ts-ignore
              value={values.interests || ''}
              handleChange={handleChange}
            />
            <TextInput
              name="ocupation"
              label="Ocupation"
              value={values.ocupation || ''}
              handleChange={handleChange}
            />
            <PlaceInput
              label="Country"
              value={country || ''}
              options={{ typs: ['(regions)'] }}
              handleChange={handleCityChange}
              handleSelect={handleCitySelect}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Save
          </Button>
          </form>
        )}
    </Paper>
  );
}

export default AboutPage;
