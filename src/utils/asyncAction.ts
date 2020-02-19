import { asyncActionStart, asyncActionFinish, asyncActionError } from '../store/actions/asyncActions';

export function asyncAction(dispatch: any, actionCallback: () => void) {
  dispatch(asyncActionStart());

  try {
    actionCallback();
    dispatch(asyncActionFinish());
  } catch (err) {
    console.error(err.message);
    dispatch(asyncActionError(err.message));
  }
}
