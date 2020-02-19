import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsSidebar from './EventDetailsSidebar';
import firebase from '../../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { asyncActionError, asyncActionStart, asyncActionFinish } from '../../../store/actions/asyncActions';
import Spinner from '../../Shared/Spinner';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2)
    }
  })
);

function EventDetailsPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState();
  const { loading } = useSelector((state: any) => state.asyncReducer);

  useEffect(() => {
    async function fetchEvent() {
      if (!id) return;

      dispatch(asyncActionStart());
      try {
        const doc = await firebase.firestore().collection('events').doc(id).get();

        if (doc.exists) {
          setData(doc.data());
          dispatch(asyncActionFinish());
        } else {
          // doc.data() will be undefined in this case
          dispatch(asyncActionError("No such document!"));
        }
      } catch (err) {
        console.error("Error getting document:", err);
        dispatch(asyncActionError(err.message))
      }
    }
    fetchEvent();
  }, [dispatch, id]);

  if (!data || loading) return <Spinner />

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
