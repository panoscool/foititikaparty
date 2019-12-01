import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import CloudUpload from '@material-ui/icons/CloudUpload'

function ImageInput() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <CloudUpload fontSize="large" />
    </div>
  )
}

export default ImageInput;
