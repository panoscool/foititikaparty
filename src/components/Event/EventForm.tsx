import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Paper, Button, Typography } from '@material-ui/core';
import TextInput from '../Shared/TextInput';
import DateInput from '../Shared/DateInput';
import SelectInput from '../Shared/SelectInput';
import PlaceInput from '../Shared/PlaceInput';
import Spinner from '../Shared/Spinner';
import useNotifier from '../../hooks/useNotifier';
import firebase from '../../config/firebase';
import { createNewEvent } from '../../utils/helpers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '60%',
      padding: theme.spacing(2),
      margin: '0 auto',
      [theme.breakpoints.down('md')]: {
        width: 'auto',
        margin: theme.spacing(2)
      }
    },
    button: {
      margin: theme.spacing(1, 0, 1, 1)
    },
    btnAlignment: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    sectionLabel: {
      paddingTop: 16
    }
  })
);

const categories = [
  { label: 'Drinks', value: 'drinks' },
  { label: 'Food', value: 'food' },
  { label: 'Film', value: 'film' },
  { label: 'Music', value: 'music' },
  { label: 'Culture', value: 'culture' },
  { label: 'Travel', value: 'travel' }
];

function EventForm() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const notification = useNotifier();
  const [date, setDate] = useState<Date | null>(new Date());
  const [cityLatLng, setCityLatLng] = useState({});
  const [venueLatLng, setVenueLatLng] = useState({});
  const [city, setCity] = useState('');
  const [venue, setVenue] = useState('');
  const [values, setValues] = useState({
    title: '',
    category: '',
    description: '',
    hostedBy: ''
  });
  const [state, setState] = useState({
    loading: false,
    error: ''
  })

  useEffect(() => {
    async function fetchEvent() {
      if (!id) return;

      const firestore = firebase.firestore();

      try {
        const doc = await firestore.collection('events').doc(id).get();

        if (doc.exists) {
          const d: firebase.firestore.DocumentData | undefined = doc.data();
          setValues({
            title: d?.title,
            category: d?.category,
            description: d?.description,
            hostedBy: d?.hostedBy
          });
          setCity(d?.city);
          setVenue(d?.venue);
          setVenueLatLng(d?.venueLatLng)
          setDate(d?.date.toDate());

          setState({ loading: false, error: '' });
        } else {
          // doc.data() will be undefined in this case
          setState({ loading: false, error: "No such document!" })
        }
      } catch (err) {
        console.error("Error getting document:", err.message);
        setState({ loading: false, error: err.message });
      }
    }

    fetchEvent();
  }, [id]);

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  function handleCityChange(city: string) {
    setCity(city);
  }

  function handleVenueChange(venue: string) {
    setVenue(venue);
  }

  function handleChange(event?: any) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleCitySelect(selectedCity: any) {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => setCityLatLng(latlng))
      .then(() => setCity(selectedCity))
  }

  function handleVenueSelect(selectedVenue: any) {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => setVenueLatLng(latlng))
      .then(() => setVenue(selectedVenue))
  }

  async function handleSubmit(event?: any) {
    event.preventDefault();

    const formValues = {
      ...values,
      city: city,
      venue: venue,
      date: date,
      venueLatLng: venueLatLng,
    }

    const user = firebase.auth().currentUser;
    const firestore = firebase.firestore();
    const newEvent = createNewEvent(user, formValues);

    if (id) {
      try {
        await firestore.collection('events').doc(id).update(newEvent);
        history.push(`/event/${id}`);
      } catch (err) {

      }
      notification('The event has been created successfully', 'success')
    } else {
      const createdEvent = await firestore.collection('events').add(newEvent);
      await firestore.collection('event_queries').doc(`${createdEvent.id}_${user?.uid}`).set({
        eventId: createdEvent.id,
        userId: user?.uid,
        category: values.category,
        date: date,
        city: city,
        host: true
      });

      history.push(`/event/${createdEvent.id}`);
    }
  }

  if (state.loading) return <Spinner />

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Typography color="secondary">EVENT DETAILS</Typography>
        <TextInput
          name="title"
          label="Event Title"
          value={values.title || ''}
          handleChange={handleChange}
        />
        <SelectInput
          name="category"
          label="Category"
          optionsArray={categories}
          value={values.category || ''}
          handleChange={handleChange}
        />
        <TextInput
          rows="5"
          multiline
          name="description"
          label="Description"
          value={values.description || ''}
          handleChange={handleChange}
        />
        <Typography color="secondary" className={classes.sectionLabel}>
          EVENT LOCATION DETAILS
        </Typography>
        <PlaceInput
          label="City"
          value={city || ''}
          options={{ typs: ['(cities)'] }}
          handleChange={handleCityChange}
          handleSelect={handleCitySelect}
        />
        <PlaceInput
          label="Venue"
          value={venue || ''}
          options={{
            // @ts-ignore
            location: new google.maps.LatLng(cityLatLng),
            radius: 1000,
            types: ['establishment']
          }}
          handleChange={handleVenueChange}
          handleSelect={handleVenueSelect}
        />
        <TextInput
          name="hostedBy"
          label="Hosted By"
          value={values.hostedBy || ''}
          handleChange={handleChange}
        />
        <DateInput
          label="Date"
          selectedDate={date}
          handleDateChange={handleDateChange}
        />
        <div className={classes.btnAlignment}>
          <Button
            component={Link}
            to="/"
            color="default"
            variant="contained"
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Submit
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default EventForm;
