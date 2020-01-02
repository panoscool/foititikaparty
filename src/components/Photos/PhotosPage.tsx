import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Photo from '@material-ui/icons/Photo';
import CropOriginal from '@material-ui/icons/CropOriginal';
import DropzoneInput from '../Shared/DropzoneInput';
import CropperInput from '../Shared/CropperInput';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      paddingTop: 30
    },
    button: {
      width: 100
    }
  })
);

function PhotosPage() {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  function handleCancelCrop() {
    setFiles([])
  }

  function handleUploadImage() {
    console.log(files)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Typography variant="caption" color='primary'>STEP 1 - ADD IMAGE</Typography>
        <DropzoneInput setFiles={setFiles} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="caption" color='primary'>STEP 2 - RESIZE IMAGE</Typography>
        {files.length > 0 ? (
          // @ts-ignore
          <CropperInput setImage={setImage} imagePreview={files[0].preview} />
        ) : (
            <div className={classes.icon}>
              <CropOriginal fontSize="large" />
            </div>
          )}
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="caption" color='primary'>STEP 3 - PREVIEW & UPLOAD</Typography>
        {files.length > 0 ? (
          <Fragment>
            <div className="img-preview" style={{ minHeight: '200px', minWidth: '200px', overflow: 'hidden' }} />
            <ButtonGroup variant="contained" size="small">
              <Button className={classes.button} color='primary' onClick={handleUploadImage}><Check /></Button>
              <Button className={classes.button} color='default' onClick={handleCancelCrop}><Close /></Button>
            </ButtonGroup>
          </Fragment>
        ) : (
            <div className={classes.icon}>
              <Photo fontSize="large" />
            </div>
          )}
      </Grid>
    </Grid>
  );
}

export default PhotosPage;
