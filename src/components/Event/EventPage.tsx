// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventList from './EventList';
import EventActivity from './EventActivity';
import SearchField from '../Shared/SearchField';
import Spinner from '../Shared/Spinner';
import firebase from '../../config/firebase';


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    margin: theme.spacing(2)
  }
})
);

function EventPage() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [state, setState] = useState({
    loading: false,
    error: null
  });

  useEffect(() => {
    async function fetchEvents() {
      const today = new Date();
      const firestore = firebase.firestore();
      const eventsQuery = firestore.collection('events').where('date', '>=', today);

      try {
        setState({ loading: true, error: null });

        const querySnap = await eventsQuery.get();

        const events = querySnap.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          }
        });

        setEvents(events);
        setState({ loading: false, error: null });
      } catch (error) {
        console.error(error);
        setState({ loading: false, error: error.message });
      }
    }

    fetchEvents();
  }, []);

  if (!events || state.loading) return <Spinner />;

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <SearchField />
          {events.map((doc: any) => {
            return <EventList key={doc.id} doc={doc} />;
          })}
        </Grid>
        <Grid item xs={12} sm={4}>
          <EventActivity />
        </Grid>
      </Grid>
    </div>
  );
}

export default EventPage;
