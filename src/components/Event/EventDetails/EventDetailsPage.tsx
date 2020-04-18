// @ts-nocheck
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
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
  const { userId } = useContext(AuthContext);
  const [cancelled, setCancelled] = useState<boolean | undefined>();
  const [data, setData] = useState();
  const [state, setState] = useState({
    loading: true,
    error: null
  });

  useEffect(() => {
    async function fetchEvent() {
      try {
        const doc = await firebase.firestore().collection('events').doc(id).get();
        if (doc.exists) {
          setData(doc.data());
          setCancelled(doc.data().cancelled);
          setState({ loading: false, error: null })
        } else {
          // doc.data() will be undefined in this case
          setState({ loading: false, error: "No such document!" })
        }
      } catch (err) {
        console.error("Error getting document:", err.message);
        setState({ loading: false, error: err.message })
      }
    }

    fetchEvent();
  }, [id]);

  async function cancelToggle() {
    try {
      setCancelled(!cancelled);
      await firebase.firestore().collection('events').doc(id).update({
        cancelled: !cancelled
      });
      notification('The event has been created successfully', 'success')
    } catch (err) {
      console.error(err.message)
    }
  }

  async function handleDelete() {
    try {
      await firebase.firestore().collection('events').doc(id).delete();

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
            <EventDetailsHeader data={data} isHost={isHost} cancelled={cancelled} handleDelete={handleDelete} cancelToggle={cancelToggle} />
            <EventDetailsInfo date={data.date} description={data.description} isHost={isHost} isGoing={isGoing} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EventDetailsSidebar hostedBy={data.hostedBy} hostPhotoURL={data.hostPhotoURL} attendees={attendees} />
          </Grid>
        </Grid>}
    </div>
  );
}

export default EventDetailsPage;
