// @ts-nocheck
import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function CropperInput({ imagePreview, setImage }) {
  const cropper = useRef(null);
  function cropImage() {
    if (typeof cropper.current.getCroppedCanvas() === 'undefined') {
      return;
    }

    cropper.current.getCroppedCanvas().toBlob(blob => {
      setImage(blob);
    });
  }

  return (
    <Cropper
      ref={cropper}
      src={imagePreview}
      style={{ height: 200, width: 200 }}
      preview=".img-preview"
      aspectRatio={1}
      viewMode={1}
      dragMode="move"
      guides={false}
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
    />
  );
}

export default CropperInput;
