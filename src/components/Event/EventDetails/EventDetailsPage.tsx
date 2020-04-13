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
  const [state, setState] = useState({
    loading: true,
    error: null
  })

  useEffect(() => {
    async function fetchEvent() {
      try {
        const doc = await firebase.firestore().collection('events').doc(id).get();

        if (doc.exists) {
          setData(doc.data());
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

  if (!data || state.loading) return <Spinner />;

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
