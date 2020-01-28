import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from '../actionTypes'

const initialState = {
  notifications: [],
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload,
          },
        ]
      }

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          // @ts-ignore
          (notification) => notification.key !== action.key,
        ),
      };
    default:
      return state;
  }
}

export default reducer;
