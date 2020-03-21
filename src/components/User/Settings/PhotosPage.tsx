// @ts-nocheck
import React, { useState, useEffect, useContext } from 'react';
import cuid from 'cuid';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import DropzoneInput from '../../Shared/DropzoneInput';
import CropperInput from '../../Shared/CropperInput';
import { AuthContext } from '../../../context/AuthContext';
import firebase from '../../../config/firebase';
import Progress from '../../Shared/Progress';
import UserPhotos from './UserPhotos';
import useNotifier from '../../../hooks/useNotifier';

const error_codes = [
  { code: 'storage/unauthorized', message: 'User doesnt have permission to access the object' },
  { code: 'storage/canceled', message: 'User canceled the upload' },
  { code: 'storage/unknown', message: 'Unknown error occurred' },
]

function PhotosPage() {
  const { userId } = useContext(AuthContext);
  const notification = useNotifier();
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [completed, setCompleted] = useState(0);
  const [snapshot, setSnapshot] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) return;

    async function fetchUserProfile() {
      try {
        const doc = await firebase.firestore().collection('users').doc(userId).get();

        if (doc.exists) {
          setSnapshot(doc.data());
        } else {
          // doc.data() will be undefined in this case
          setState({ loading: false, error: "No such document!" })
        }
      } catch (err) {
        console.error("Error getting document:", err.message);
      }
    }

    fetchUserProfile();
    return () => {
      files.forEach(file => URL.revokeObjectURL(file?.preview));
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
        setCompleted(progress)
      }, function (error) {
        setError(error_codes[error.code]);
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
        }).then(function () {
          handleCancelPhoto();
        });
      });
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={3}>
          <Typography
            variant="caption"
            color="primary"
            display="block"
            gutterBottom
          >
            STEP 3 - PREVIEW & UPLOAD
          </Typography>
          {files.length > 0 && <div className='img-preview' style={{ minHeight: '200px', minWidth: '200px', overflow: 'hidden' }} />}
        </Grid>
      </Grid>
      <Progress completed={completed} />
      <Button onClick={handleUploadImage}>add photo</Button>
      <UserPhotos userId={userId} profile={snapshot} deleteImage={handleDeleteImage} setMainPhoto={handleMainPhoto} />
    </div>
  );
}

export default PhotosPage;
