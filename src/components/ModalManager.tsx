// @ts-nocheck
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import LoginModal from './Authentication/LoginModal';
import RegisterModal from './Authentication/RegisterModal';

const modals = {
  LoginModal,
  RegisterModal
};

function ModalManager() {
  const { modal } = useContext(ThemeContext)

  if (modal && modals[modal]) {
    const ModalComponent = modals[modal];
    return <ModalComponent />;
  }

  return null;
};

export default ModalManager;
