// @ts-nocheck
import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/Done';
import Delete from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Spinner from '../../Shared/Spinner';
import firebase from '../../../config/firebase';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  card: {
    width: 100,
    height: 100,
    margin: theme.spacing(0, 1, 6, 0)
  },
  caption: {
    color: 'white',
    background: '#1b5e20',
    textAlign: 'center',
    padding: theme.spacing(0.8)
  },
  button: {
    marginBottom: theme.spacing(2)
  },
  doneIcon: {
    color: 'green'
  },
  deleteIcon: {
    color: 'red'
  }
}));

interface Props {
  userId: string
  profile: object
  deleteImage: () => void
  setMainPhoto: () => void
}

function UserPhotos({ userId, profile, deleteImage, setMainPhoto }: Props) {
  const classes = useStyles();
  const [photos, setPhotos] = useState([]);
  const [state, setState] = useState({
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!userId) return;

    const firestore = firebase.firestore();
    const userDocRef = firestore.collection('users').doc(userId);

    const unsubscribe = userDocRef.collection('photos').onSnapshot(snap => {
      const photos = snap.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });
      setPhotos(photos);
      setState({ loading: false, error: null });
    }, error => {
      console.error(error.message);
      setState({ loading: false, error: error });
    }
    );

    return () => {
      unsubscribe();
    };
  }, [userId]);

  if (!photos || state.loading) return <Spinner />;

  const filteredPhotos = photos && photos.filter(photo => {
    return photo.url !== profile.photoURL
  })

  function renderList(d: any) {
    return (
      <div key={d.id} className={classes.card}>
        <CardMedia component="img" alt={d.name} image={d.url} />
        <ButtonGroup fullWidth size="small">
          <Button onClick={() => setMainPhoto(d)}>
            <Done className={classes.doneIcon} />
          </Button>
          <Button onClick={() => deleteImage(d)}>
            <Delete className={classes.deleteIcon} />
          </Button>
        </ButtonGroup>
      </div>
    )
  }

  return (
    <Fragment>
      <Typography gutterBottom variant='caption' color='primary' display="block">ALL PHOTOS</Typography>
      <div className={classes.root}>
        <div className={classes.card}>
          <CardMedia component="img" alt={profile.displayName} image={profile.photoURL || '/assets/images/user.png'} />
          <Typography variant="caption" display="block" className={classes.caption}>MAIN PHOTO</Typography>
        </div>
        {filteredPhotos.map((doc: any) => {
          return renderList(doc);
        })}
      </div>
    </Fragment>
  )
}

export default UserPhotos;
