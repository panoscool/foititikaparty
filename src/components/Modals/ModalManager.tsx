// @ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    width: '100%',
    maxHeight: 435,
    margin: theme.spacing(2)
  },
}));

const modalLookup = {
  LoginModal,
  RegisterModal
};

function ModalManager() {
  const classes = useStyles();
  const currentModal = useSelector((state: any) => state.modalReducer);

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    return <ModalComponent classes={{ paper: classes.paper }} {...modalProps} />;
  }
  return null;
};

export default ModalManager;
