// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import format from 'date-fns/format';
import firebase from '../../config/firebase';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AccessTime from '@material-ui/icons/AccessTime';
import RoomOutlined from '@material-ui/icons/RoomOutlined';
import EventActivity from './EventActivity';
import SearchField from '../Shared/SearchField';
import Spinner from '../Shared/Spinner';
import { objectToArray } from '../../utils/helpers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2)
    },
    card: {
      margin: theme.spacing(1, 0)
    },
    avatar: {
      width: 60,
      height: 60
    },
    icon: {
      verticalAlign: 'text-bottom'
    },
    infoBlock: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    cancelledText: {
      color: 'white',
      background: 'red',
      padding: theme.spacing(0, 0.5)
    }
  })
);

function EventPage() {
  const classes = useStyles();
  const history = useHistory();
  const [snapshot, setSnapshot] = useState([]);
  const [state, setState] = useState({
    loading: true,
    error: ''
  });

  useEffect(() => {
    const firestoreRef = firebase.firestore().collection('events')
    const unsubscribe = firestoreRef.onSnapshot(snap => {
      // @ts-ignore
      setSnapshot(snap);
      setState({ loading: false, error: '' });
    }, err => {
      console.error(err.message);
      setState({ loading: false, error: err.message });
    }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  function renderList(doc: any) {
    const d = doc.data();
    const attendees = objectToArray(d.attendees);
    return (
      <Card key={doc.id} className={classes.card}>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar
                className={classes.avatar}
                alt="avatar"
                src={d.hostPhotoURL}
              />
            }
            title={d.title}
            subheader={d.hostedBy}
            onClick={() => history.push(`/event/${doc.id}`)}
          />
        </CardActionArea>
        <Divider />
        <CardContent>
          <Typography gutterBottom variant="body2" color="textPrimary">
            <AccessTime className={classes.icon} />{' '}
            {format(d.date.toDate(), 'do MMM yyyy')}{' '}
            {format(d.date.toDate(), 'h:mm a')}{' '}
            <RoomOutlined className={classes.icon} /> {d.venue}
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary">
            {d.description}
          </Typography>
          <div className={classes.infoBlock}>
            <Typography variant='caption' color="textSecondary">Attendees: {attendees.length}</Typography>
            {d.cancelled && <Typography variant='caption' className={classes.cancelledText}>This event has been cancelled</Typography>}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!snapshot || state.loading) return <Spinner />;

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <SearchField />
          {snapshot.docs.map((doc: any) => {
            return renderList(doc);
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
