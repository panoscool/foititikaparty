// @ts-nocheck
import { asyncAction } from '../../utils/asyncAction';
import { closeModal } from './modalActions';
import { enqueueSnackbar } from './notificationActions';
import firebase from '../../config/firebase';

export const registerUser = (creds) => async (dispatch) => {
  asyncAction(dispatch, async () => {
    const createdUser = await firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password);

    const newUser = {
      displayName: creds.displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }

    await firebase.firestore().collection('users').doc(createdUser.user?.uid).set(newUser)
    dispatch(closeModal());
  })
}

export const loginUser = (creds) => async (dispatch) => {
  asyncAction(dispatch, async () => {
    await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);

    dispatch(closeModal());
  })
}

export const logoutUser = () => async (dispatch) => {
  asyncAction(dispatch, async () => {
    await firebase.auth().signOut();
  })
}

export const socialAuth = (selectedProvider) => async (dispatch) => {
  asyncAction(dispatch, async () => {
    const provider = {
      facebook: new firebase.auth.FacebookAuthProvider(),
      google: new firebase.auth.GoogleAuthProvider()
    };

    dispatch(closeModal());

    await firebase.auth().signInWithPopup(provider[selectedProvider]);
  })
}

export const updatePassword = (creds) => async (dispatch) => {
  asyncAction(dispatch, async () => {
    const user = firebase.auth().currentUser;

    await user?.updatePassword(creds.newPassword1);
    dispatch(enqueueSnackbar('Your password has been updated.', 'success'))
  })
}
