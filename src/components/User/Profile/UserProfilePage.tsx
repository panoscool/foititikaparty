// @ts-nocheck
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import UserProfileHeader from './UserProfileHeader';
import UserProfileDescription from './UserProfileDescripion';
import UserProfilePhotos from './UserProfilePhotos';
import UserProfileEvents from './UserProfileEvents';
import Spinner from '../../Shared/Spinner';
import firebase from '../../../config/firebase';
import { AuthContext } from '../../../context/AuthContext';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    margin: theme.spacing(2)
  }
})
);

function UserProfilePage() {
  const classes = useStyles();
  const { id } = useParams();
  const { userId } = useContext(AuthContext);
  const [data, setData] = useState({
    userInfo: null,
    userPhotos: null,
    userEvents: null
  });
  const [state, setState] = useState({
    loading: true,
    error: null
  })

  useEffect(() => {
    async function fetchProfile() {
      try {
        const usersRef = firebase.firestore().collection('users').doc(id);
        const photosRef = usersRef.collection('photos');
        const doc = await usersRef.get();
        const imgs = await photosRef.get();
        const images = imgs.docs.map(d => d.data());

        if (doc.exists) {
          setData({ userInfo: doc.data(), userPhotos: images });
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

    fetchProfile();

  }, [id]);

  if (!data.userInfo || state.loading) return <Spinner />;

  const isCurrentUser = userId === id

  return (
    <div className={classes.root}>
      <UserProfileHeader
        isCurrentUser={isCurrentUser}
        displayName={data.userInfo.displayName}
        photoURL={data.userInfo.photoURL}
        ocupation={data.userInfo.ocupation} />
      <UserProfileDescription data={data.userInfo} />
      <UserProfilePhotos />
      <UserProfileEvents />
    </div>
  )
}

export default UserProfilePage;
