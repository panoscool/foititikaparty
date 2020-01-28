// @ts-nocheck
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSnackbar } from './store/actions/notificationActions';

function Notifier() {
  const { enqueueSnackbar } = useSnackbar();
  const { notifications } = useSelector((state) => state.notificationReducer);
  const dispatch = useDispatch();
  const [displayed, setDisplayed] = useState([]);

  function storeDisplayed(key) {
    setDisplayed([...displayed, key]);
  }

  notifications.forEach((notification) => {
    setTimeout(() => {

      // If notification already displayed, abort
      if (displayed.indexOf(notification.options.key) >= 0) return;

      // Display notification using notistack
      enqueueSnackbar(notification.message, notification.options);

      // Add notification's key to the local state
      storeDisplayed(notification.options.key);

      // Dispatch action to remove the notification from the redux store
      dispatch(removeSnackbar(notification.options.key));
    }, 1);
  })


  return null;
}

export default Notifier;
