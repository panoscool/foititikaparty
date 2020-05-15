// @ts-nocheck
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import EventList from './EventList';
import EventActivity from './EventActivity';
import SearchField from '../Shared/SearchField';
import Spinner from '../Shared/Spinner';
import firebase from '../../config/firebase';


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(2)
  },
  main: {
    width: '70%'
  },
  sticky: {
    width: '30%',
    position: 'sticky',
    marginLeft: theme.spacing(2)
  }
})
);

function EventPage() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [state, setState] = useState({
    loading: false,
    loadMore: false,
    moreEvents: false,
    error: null
  });

  useEffect(() => {
    async function fetchEvents() {
      const today = new Date();
      const firestore = firebase.firestore();
      const eventsRef = firestore.collection('events');

      try {
        setState({ loading: true });

        const querySnap = await eventsRef.where('date', '>=', today).orderBy('date').limit(25).get();

        const events = querySnap.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          }
        });

        setEvents(events);
        if (querySnap && querySnap.docs && querySnap.docs.length > 1) {
          setState({ moreEvents: true, loadMore: false, loading: false, error: null });
        }
      } catch (error) {
        console.error(error);
        setState({ loading: false, moreEvents: false, loadMore: false, error: error.message });
      }
    }

    fetchEvents();
  }, []);

  async function getNextEvents() {
    const today = new Date();
    const firestore = firebase.firestore();
    const eventsRef = firestore.collection('events');
    let lastVisible = events && events[events.length - 1];

    try {
      setState({ loadMore: true });

      let startAfter = lastVisible && await eventsRef.doc(lastVisible.id).get();
      const next = await eventsRef.where('date', '>=', today).orderBy('date').startAfter(startAfter).limit(25).get();

      const moreEvents = next.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });

      setEvents([...events, ...moreEvents]);
      setState({ ...state, loadMore: false });

      if (next && next.docs && next.docs.length <= 1) {
        setState({ moreEvents: false });
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!events || state.loading) return <Spinner />;

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <SearchField />
        {events && events.length !== 0 &&
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextEvents}
            hasMore={!state.loading && state.moreEvents}
            initialLoad={false}
          >
            {events.map((doc: any) => {
              return <EventList key={doc.id} doc={doc} />;
            })}
          </InfiniteScroll>
        }
        {state.loadMore && <Spinner />}
      </div>
      <div className={classes.sticky}>
        <EventActivity />
      </div>
    </div>
  );
}

export default EventPage;
