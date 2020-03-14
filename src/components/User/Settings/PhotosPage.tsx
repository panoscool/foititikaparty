import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import DropzoneInput from '../../Shared/DropzoneInput';
import CropperInput from '../../Shared/CropperInput';

function PhotosPage() {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null)

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file?.preview));
    };
  }, [files]);

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
          {files.length > 0  &&
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
          {files.length > 0 && <div className='img-preview' style={{minHeight: '200px', minWidth: '200px', overflow: 'hidden'}} />}
        </Grid>
      </Grid>
    </div>
  );
}

export default PhotosPage;
