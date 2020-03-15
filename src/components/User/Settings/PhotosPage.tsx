// @ts-nocheck
import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import DropzoneInput from '../../Shared/DropzoneInput';
import CropperInput from '../../Shared/CropperInput';
import { AuthContext } from '../../../context/AuthContext';
import firebase from '../../../config/firebase';

function PhotosPage() {
  const { userId } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null)

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file?.preview));
    };
  }, [files]);

  function handleCancelPhoto() {
    setFiles([]);
    setImage(null);
  }

  async function handleUploadImage() {
    const path = `${userId}/user_images/`
    const fileName = files[0].name
    try {
      // upload file to firebase storage
      const storageRef = firebase.storage().ref(path + fileName)
      const uploadedFile = await storageRef.put(image);
      console.log(uploadedFile)
      // get url of the image
      const downloadURL = await uploadedFile.ref.getDownloadURL();
      console.log(downloadURL)
      // get user doc
      const userDoc = firebase.firestore().collection('users').doc(userId).get();
      console.log(userDoc)
      // check if user has photo, if not update profile
      if (!userDoc.data().photoURL) {
        await firebase.firestore().collection('users').doc(userId).update({
          photoURL: downloadURL
        });
      }
      // add image to firestore
      await firebase.firestore().collection('users').doc(userId).collection('photos').add({ name: fileName, url: downloadURL })
      handleCancelPhoto();
    } catch (err) {
      console.error(err.message)
    }
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
      <Button onClick={handleUploadImage}>add photo</Button>
    </div>
  );
}

export default PhotosPage;
