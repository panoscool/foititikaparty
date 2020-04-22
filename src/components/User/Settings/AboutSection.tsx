import React, { useState, useEffect, useContext } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextInput from '../../Shared/TextInput';
import SelectInput from '../../Shared/SelectInput';
import RadioInput from '../../Shared/RadioInput';
import DateInput from '../../Shared/DateInput';
import PlaceInput from '../../Shared/PlaceInput';
import Spinner from '../../Shared/Spinner';
import useNotifier from '../../../hooks/useNotifier';
import { AuthContext } from '../../../context/AuthContext';
import firebase from '../../../config/firebase';
import { clearUndefined } from '../../../utils/helpers';

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    margin: theme.spacing(2, 0)
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

function AboutSection() {
  const classes = useStyles();
  const notification = useNotifier()
  const { userId } = useContext(AuthContext);
  const [date, setDate] = useState<Date | null>(new Date());
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [values, setValues] = useState({
    displayName: '',
    gender: '',
    status: '',
    about: '',
    interests: [],
    ocupation: ''
  });
  const [state, setState] = useState({
    loading: false,
    error: null
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!userId) return;

      setState({ loading: true, error: null });
      const firestore = firebase.firestore();

      try {
        const doc = await firestore.collection('users').doc(userId).get();
        const d = doc.data();

        setValues({
          displayName: d?.displayName || '',
          gender: d?.gender || '',
          status: d?.status || '',
          about: d?.about || '',
          interests: d?.interests || [],
          ocupation: d?.ocupation || ''
        });
        setCity(d?.city);
        setCountry(d?.country);
        setDate(d?.date && d?.date.toDate());

        setState({ loading: false, error: null });
      } catch (err) {
        console.error(err.message);
        setState({ loading: false, error: err.message });
      }
    }

    fetchProfile();
  }, [userId]);

  function handleChange(event?: any) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  function handleCityChange(city: string) {
    setCity(city);
  }

  function handleCitySelect(selectedCity: any) {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(() => setCity(selectedCity))
  }

  function handleCountryChange(country: string) {
    setCountry(country);
  }

  function handleCountrySelect(selectedCountry: any) {
    geocodeByAddress(selectedCountry)
      .then(results => getLatLng(results[0]))
      .then(() => setCountry(selectedCountry));
  }

  async function handleSubmit(event?: any) {
    event.preventDefault();
    const formValues = {
      ...values,
      date,
      city,
      country
    };

    clearUndefined(formValues);

    const firestore = firebase.firestore();

    try {
      const user = firebase.auth().currentUser;

      await user?.updateProfile({ displayName: values.displayName });
      await firestore.collection('users').doc(userId).update(formValues);
      notification('Your profile has been updated', 'success')
    } catch (err) {
      console.error(err.message);
      setState({ loading: false, error: err.message });
    }
  }

  if (state.loading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="displayName"
        label="Display Name"
        value={values.displayName || ''}
        handleChange={handleChange} />
      <DateInput
        dateType="date"
        label="Date of birth"
        selectedDate={date}
        handleDateChange={handleDateChange} />
      <RadioInput
        name="gender"
        label="Gender"
        value={values.gender || ''}
        handleChange={handleChange}
        optionsArray={[
          { label: "Female", value: "female" },
          { label: "Male", value: "male" }
        ]} />
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
        label="City"
        value={city || ''}
        options={{ typs: ['(cities)'] }}
        handleChange={handleCityChange}
        handleSelect={handleCitySelect}
      />
      <PlaceInput
        label="Country"
        value={country || ''}
        options={{ typs: ['(regions)'] }}
        handleChange={handleCountryChange}
        handleSelect={handleCountrySelect}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Update Profile
      </Button>
    </form>
  );
}

export default AboutSection;
