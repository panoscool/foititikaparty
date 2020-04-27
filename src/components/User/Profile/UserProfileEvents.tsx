import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Tabs, Tab, Divider, Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core';
import { LibraryBooksOutlined } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import PaperPage from '../../Shared/PaperPage';
import firebase from '../../../config/firebase';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2)
  },
  card: {
    maxWidth: 130,
    textAlign: 'center',
    boxShadow: 'none',
    marginRight: theme.spacing(1)
  },
  icon: {
    verticalAlign: 'sub'
  }
})
);

function UserProfileEvents() {
  const classes = useStyles();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [events, setEvents] = useState<any[]>([]);
  const [state, setState] = useState({
    loading: false,
    error: null
  });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    async function getUserEvents() {
      const today = new Date(Date.now());
      const firestore = firebase.firestore();
      const eventsRef = firestore.collection('event_queries');

      let query;
      switch (activeTab) {
        case 1: // past events
          query = eventsRef
            .where('userId', '==', id)
            .where('date', '<=', today)
            .orderBy('date', 'desc');
          break;
        case 2: // future events
          query = eventsRef
            .where('userId', '==', id)
            .where('date', '>=', today)
            .orderBy('date');
          break;
        case 3: // hosted events
          query = eventsRef
            .where('userId', '==', id)
            .where('host', '==', true)
            .orderBy('date', 'desc');
          break;
        default:
          query = eventsRef
            .where('userId', '==', id)
            .orderBy('date', 'desc');
      }

      try {
        setState({ loading: true, error: null });
        let querySnap = await query.get();

        let events: object[] = [];

        for (let i = 0; i < querySnap.docs.length; i++) {
          let evt = await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get();

          events.push({ ...evt.data(), id: evt.id });
        };

        setEvents(events);
        setState({ loading: false, error: null });
      } catch (error) {
        console.error(error);
        setState({ loading: false, error: error });
      }
    }
    getUserEvents();
  }, [activeTab, id]);

  return (
    <PaperPage>
      <Typography gutterBottom variant='h6'><LibraryBooksOutlined className={classes.icon} /> Events</Typography>
      <Tabs
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
      >
        <Tab label="All Events" />
        <Tab label="Past Events" />
        <Tab label="Future Events" />
        <Tab label="Hosted Events" />
      </Tabs>
      <Divider variant='fullWidth' />
      {state.loading ? <Skeleton variant="rect" width={130} height={210} /> :
        <div className={classes.root}>
          {events && events.map(evt => (
            <Card key={evt.id} className={classes.card}>
              <CardActionArea component={Link} to={`/event/${evt.id}`}>
                <CardMedia component='img' alt={evt.title} height='100' image={`/assets/categories/${evt.category}.jpg`} />
                <CardContent>
                  <Typography gutterBottom color='textPrimary' variant='subtitle2'>{evt.title}</Typography>
                  <Typography color='textSecondary' variant='caption'>{format(evt.date && evt.date.toDate(), 'do MMM yyyy')}</Typography>
                  <br />
                  <Typography color='textSecondary' variant='caption'>{format(evt.date && evt.date.toDate(), 'h:mm a')}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>}
    </PaperPage>
  )
}

export default UserProfileEvents;
