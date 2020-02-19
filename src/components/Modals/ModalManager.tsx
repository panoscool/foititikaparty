// @ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';
import LoginModal from '../Authentication/LoginModal';
import RegisterModal from '../Authentication/RegisterModal';

const modalLookup = {
  LoginModal,
  RegisterModal
};

function ModalManager() {
  const currentModal = useSelector((state: any) => state.modalReducer);

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    return <ModalComponent {...modalProps} />;
  }
  return null;
};

export default ModalManager;
