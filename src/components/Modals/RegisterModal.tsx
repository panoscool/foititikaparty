import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { closeModal } from '../../store/actions/modalActions';
import RegisterPage from '../Authentication/RegisterPage';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

function RegisterModal({ ...other }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Dialog onClose={() => dispatch(closeModal())} open={true} {...other}>
      <DialogTitle>
        Register to Anyevent
        <IconButton aria-label="close" className={classes.closeButton} onClick={() => dispatch(closeModal())}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent><RegisterPage /></DialogContent>
    </Dialog>
  );
}

export default RegisterModal;
