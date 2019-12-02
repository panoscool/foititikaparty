import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function CropperInput({ imagePreview, setImage }: any) {
  const cropper = useRef(null);

  function cropImage() {
    // @ts-ignore
    if (typeof cropper.current.getCroppedCanvas() === 'undefined') return;
    // @ts-ignore
    cropper.current.getCroppedCanvas().toBlob(blob => {
      setImage(blob);
    }, 'image/jpeg');
  }

  return (
    <Cropper
      // @ts-ignore
      ref={cropper}
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
      preview=".img-preview"
      aspectRatio={1}
      viewMode={1}
      dragMode="move"
      guides={false}
      scalable={true}
      center={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
    />
  );
}

export default CropperInput;
