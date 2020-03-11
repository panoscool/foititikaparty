// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsSidebar from './EventDetailsSidebar';
import Spinner from '../../Shared/Spinner';
import firebase from '../../../config/firebase';
import useFeedback from '../../../hooks/useFeedback';

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
  const [data, setData] = useState();
  const { state, handleFeedback } = useFeedback({ loading: true, error: null })

  useEffect(() => {
    async function fetchEvent() {
      if (!id) return;

      try {
        const doc = await firebase.firestore().collection('events').doc(id).get();

        if (doc.exists) {
          setData(doc.data());
          handleFeedback(false);
        } else {
          // doc.data() will be undefined in this case
          handleFeedback(false, "No such document!");
        }
      } catch (err) {
        console.error("Error getting document:", err.message);
        handleFeedback(false, err.message);
      }
    }
    fetchEvent();

  }, [handleFeedback, id]);

  if (!data || state.loading) return <Spinner />

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <EventDetailsHeader data={data} />
          <EventDetailsInfo data={data} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <EventDetailsSidebar data={data} />
        </Grid>
      </Grid>
    </div>
  );
}

export default EventDetailsPage;
