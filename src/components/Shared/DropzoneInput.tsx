import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloudUpload from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme: Theme) => createStyles({
  dropzone: {
    border: 'dashed 3px #eee',
    borderRadius: 5,
    paddingTop: 30,
    textAlign: 'center',
    cursor: 'pointer'
  },
  dropzoneActive: {
    border: 'dashed 3px green'
  }
})
);

function DropzoneInput({ setFiles }: any) {
  const classes = useStyles();
  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map((file: object) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*'
  });

  return (
    <div
      {...getRootProps()}
      className={`${classes.dropzone} ${isDragActive &&
        classes.dropzoneActive}`}
    >
      <input {...getInputProps()} />
      <CloudUpload fontSize="large" />
      <Typography variant="caption" display="block" gutterBottom>
        Drop image here
      </Typography>
    </div>
  );
}

export default DropzoneInput;
