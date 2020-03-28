// @ts-nocheck
import React, { useState, useEffect, useContext, Fragment } from 'react';
import cuid from 'cuid';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography, Button, ButtonGroup, Divider } from '@material-ui/core';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import { AuthContext } from '../../../context/AuthContext';
import CropperInput from '../../Shared/CropperInput';
import DropzoneInput from '../../Shared/DropzoneInput';
import Progress from '../../Shared/Progress';
import UserPhotos from './UserPhotos';
import useNotifier from '../../../hooks/useNotifier';
import firebase from '../../../config/firebase';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    margin: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  doneIcon: {
    color: 'green',
    width: 100
  },
  deleteIcon: {
    color: 'red',
    width: 100
  }
}));

const error_codes = [
  { code: 'storage/unauthorized', message: 'User doesnt have permission to access the object' },
  { code: 'storage/canceled', message: 'User canceled the upload' },
  { code: 'storage/unknown', message: 'Unknown error occurred' },
]

function PhotosSection() {
  const classes = useStyles();
  const notification = useNotifier();
  const { userId } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [completed, setCompleted] = useState(0);
  const [snapshot, setSnapshot] = useState({});
  const [state, setState] = useState({
    loading: false,
    error: ''
  });

  useEffect(() => {
    if (!userId) return;

    const firestoreRef = firebase.firestore().collection('users').doc(userId)
    const unsubscribe = firestoreRef.onSnapshot(snap => {
      // @ts-ignore
      setSnapshot(snap.data());
    }, err => {
      console.error(err.message);
    }
    );

    return () => {
      files.forEach(file => URL.revokeObjectURL(file?.preview));
      unsubscribe();
    };
  }, [files, userId]);

  function handleCancelPhoto() {
    setFiles([]);
    setImage(null);
  }

  async function handleMainPhoto(photo) {
    if (!userId) return;

    const firestoreRef = firebase.firestore().collection('users').doc(userId);

    try {
      await firestoreRef.update({ photoURL: photo.url });
      notification('Your profile has been updated', 'success');
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handleDeleteImage(photo) {
    if (!userId) return;

    const imageId = photo.id
    const imageName = photo.data().name

    // Create a reference to the file to delete
    const storageRef = firebase.storage().ref(`${userId}/user_images/${imageName}`);
    const firestoreRef = firebase.firestore().collection('users').doc(userId);

    try {
      // Delete the file from storage
      await storageRef.delete();
      // Delete the file from firestore
      await firestoreRef.collection('photos').doc(imageId).delete();
      notification('Image has been deleted', 'success');
    } catch (err) {
      // Uh-oh, an error occurred!
      console.log(err.message)
    }
  }

  async function handleUploadImage() {
    const imageName = cuid();
    const path = `${userId}/user_images/`
    const userDoc = await firebase.firestore().collection('users').doc(userId).get();
    const storageRef = firebase.storage().ref(path + imageName);
    const firestoreRef = firebase.firestore().collection('users').doc(userId);

    // Upload file and metadata to the object 'user_images/file_name.jpg'
    const uploadTask = storageRef.put(image);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setState({ loading: true, error: '' })
        setCompleted(progress)
      }, function (error) {
        setState({ loading: false, error: error_codes[error.code] });
      }, function () {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          // Check if user has photo, if not update profile
          if (!userDoc.data().photoURL) {
            firestoreRef.update({
              photoURL: downloadURL
            });
          }
          // Add image to firestore
          firestoreRef.collection('photos').add({ name: imageName, url: downloadURL })
          setState({ loading: false, error: '' });
        }).then(function () {
          handleCancelPhoto();
        });
      });
  }

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="caption"
            color="primary"
            display="block"
            gutterBottom
          >
            STEP 1 - ADD PHOTO
          </Typography>
          <DropzoneInput setFiles={setFiles} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="caption"
            color="primary"
            display="block"
            gutterBottom
          >
            STEP 2 - RESIZE IMAGE
          </Typography>
          {files.length > 0 &&
            <CropperInput setImage={setImage} imagePreview={files[0].preview} />}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="caption"
            color="primary"
            display="block"
            gutterBottom
          >
            STEP 3 - PREVIEW & UPLOAD
          </Typography>
          {files.length > 0 && <>
            <div className='img-preview' style={{ minHeight: '200px', minWidth: '200px', overflow: 'hidden' }} />
            <ButtonGroup size="small" >
              <Button disabled={state.loading} onClick={handleUploadImage} className={classes.doneIcon}>
                <Done />
              </Button>
              <Button disabled={state.loading} onClick={handleCancelPhoto} className={classes.deleteIcon}>
                <Clear />
              </Button>
            </ButtonGroup>
          </>}
        </Grid>
      </Grid>
      <Typography variant='caption' color='error'>{state.error}</Typography>
      <div className={classes.divider}>
        {!state.loading ? <Divider variant="fullWidth" /> : <Progress completed={completed} />}
      </div>
      <UserPhotos userId={userId} profile={snapshot} deleteImage={handleDeleteImage} setMainPhoto={handleMainPhoto} />
    </Fragment>
  );
}

export default PhotosSection;
