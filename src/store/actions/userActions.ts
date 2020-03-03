import { asyncAction } from "../../utils/asyncAction";
import { enqueueSnackbar } from "./notificationActions";
import firebase from '../../config/firebase';

export const updateProfile = (updatedProfile: any) => (dispatch: any) => {
  asyncAction(dispatch, async () => {
    const userId = firebase.auth().currentUser;

    await firebase.firestore().collection('users').doc(userId?.uid).update(updatedProfile);
    dispatch(enqueueSnackbar('Your profile has been updated', 'success'))
  })
}
