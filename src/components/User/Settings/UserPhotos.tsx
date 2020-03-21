// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Done from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import Spinner from '../../Shared/Spinner';
import firebase from '../../../config/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
  },
  paper: {
    width: 100,
    height: 100,
    marginRight: theme.spacing(1)
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
  const [snapshot, setSnapshot] = useState([]);
  const [state, setState] = useState({
    loading: true,
    error: ''
  });

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('photos')
      .onSnapshot(
        snap => {
          setSnapshot(snap);
          setState({ loading: false, error: '' })
        },
        err => {
          console.error(err.message);
        }
      );

    return () => {
      unsubscribe();
    };
  }, [userId]);

  if (!snapshot || state.loading) return <Spinner />;

  let filteredPhotos;
  if (snapshot) {
    filteredPhotos = snapshot.docs.filter(doc => {
      const photo = doc.data();
      return photo.url !== profile.photoURL
    })
  }

  function renderList(doc: any) {
    const d = doc.data();
    return (
      <div key={doc.id} className={classes.root}>
        <Paper className={classes.paper}>
          <CardMedia component="img" alt={d.name} image={d.url} />
          <ButtonGroup fullWidth size="small">
            <Button onClick={() => setMainPhoto(d)} className={classes.doneIcon}>
              <Done />
            </Button>
            <Button onClick={() => deleteImage(doc)} className={classes.deleteIcon}>
              <Delete />
            </Button>
          </ButtonGroup>
        </Paper>
      </div>
    )
  }

  return (
    <>
      <Typography gutterBottom variant='caption' color='primary' display="block">ALL PHOTOS</Typography>
      <div style={{ display: 'flex' }}>
        <Paper className={classes.paper}>
          <CardMedia component="img" alt={profile.name} image={profile.photoURL} />
        </Paper>
        {filteredPhotos.map((doc: any) => {
          return renderList(doc);
        })}
      </div>
    </>
  )
}

export default UserPhotos;
