import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function CropperInput({ imagePreview, setImage }: any) {
  const cropper = useRef(null);

  function cropImage() {
    if (typeof cropper.current.getCropperCanvas() === 'undefined') return;
    cropper.current.getCropperCanvas().toBlob(blob => {
      setImage(blob);
    }, 'image/jpeg');
  }

  return (
    <Cropper
      ref={cropper}
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
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
