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
    const unsubscribe = firebase
      .firestore()
      .collection('events')
      .onSnapshot(
        snap => {
          // @ts-ignore
          setSnapshot(snap);
          setState({ loading: false, error: '' });
        },
        err => {
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
          <Typography variant="body2" color="textSecondary">
            Attendees: 10
          </Typography>
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
