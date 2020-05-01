// @ts-nocheck
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsChat from './EventDetailsChat';
import EventDetailsSidebar from './EventDetailsSidebar';
import Spinner from '../../Shared/Spinner';
import { objectToArray } from '../../../utils/helpers';
import useNotifier from '../../../hooks/useNotifier';
import { AuthContext } from '../../../context/AuthContext';
import firebase from '../../../config/firebase';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2)
    }
  })
);

function EventDetailsPage() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const notification = useNotifier();
  const { authenticated, userId } = useContext(AuthContext);
  const [cancelled, setCancelled] = useState<boolean | undefined>();
  const [data, setData] = useState();
  const [state, setState] = useState({
    loading: false,
    error: null
  });

  const fetchEvent = useCallback(async () => {
    const firestore = firebase.firestore();

    try {
      setState({ loading: true, error: null });

      const doc = await firestore.collection('events').doc(id).get();
      if (doc.exists) {
        setData(doc.data());
        setCancelled(doc.data().cancelled);
        setState({ loading: false, error: null });
      } else {
        // doc.data() will be undefined in this case
        setState({ loading: false, error: "No such document!" })
      }
    } catch (error) {
      console.error("Error getting document:", error.message);
      setState({ loading: false, error: error.message });
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  async function goingToEvent() {
    const user = firebase.auth().currentUser;
    const firestore = firebase.firestore();

    const attendee = {
      going: true,
      joingDate: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL: user?.photoURL || '/assets/images/user.png',
      displayName: user?.displayName,
      host: false
    }

    try {
      await firestore.collection('events').doc(id).update({
        [`attendees.${user.uid}`]: attendee
      });

      await firestore.collection('event_queries').doc(`${id}_${user?.uid}`).set({
        eventId: id,
        userId: user?.uid,
        category: data.category,
        date: data.date,
        city: data.city,
        host: false
      });

      fetchEvent();

      notification('You have signed up to the event', 'success')
    } catch (error) {
      console.error(error);
    }
  }

  async function cancelGoigToEvent() {
    const user = firebase.auth().currentUser;
    const firestore = firebase.firestore();

    try {
      await firestore.collection('events').doc(id).update({
        [`attendees.${user.uid}`]: firebase.firestore.FieldValue.delete()
      });

      await firestore.collection('event_queries').doc(`${id}_${user?.uid}`).delete();

      fetchEvent();

      notification('You have removed yourself from the event', 'success')
    } catch (error) {
      console.error(error);
    }
  }

  async function cancelToggle() {
    const firestore = firebase.firestore();

    try {
      setCancelled(!cancelled);
      await firestore.collection('events').doc(id).update({
        cancelled: !cancelled
      });
      notification(!cancelled ? 'The event has been cancelled' : 'The event has been reactivated', 'success');
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    const firestore = firebase.firestore();

    try {
      await firestore.collection('events').doc(id).delete();

      history.push('/');
    } catch (err) {
      console.error(err.message);
    }
  }

  if (!data || state.loading) return <Spinner />;

  const attendees = data.attendees && objectToArray(data.attendees);
  const isHost = data.hostUid === userId;
  const isGoing = attendees && attendees.some(a => a.id === userId);

  return (
    <div className={classes.root}>
      {state.error ? <Typography variant='h6' color='error'>{state.error}</Typography> :
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <EventDetailsHeader
              authenticated={authenticated}
              data={data}
              isHost={isHost}
              cancelled={cancelled}
              handleDelete={handleDelete}
              cancelToggle={cancelToggle} />
            <EventDetailsInfo
              authenticated={authenticated}
              date={data.date}
              description={data.description}
              isHost={isHost}
              isGoing={isGoing}
              cancelled={cancelled}
              goingToEvent={goingToEvent}
              cancelGoigToEvent={cancelGoigToEvent} />
            <EventDetailsChat />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EventDetailsSidebar
              hostUid={data.hostUid}
              hostedBy={data.hostedBy}
              hostPhotoURL={data.hostPhotoURL}
              attendees={attendees} />
          </Grid>
        </Grid>}
    </div>
  );
}

export default EventDetailsPage;
