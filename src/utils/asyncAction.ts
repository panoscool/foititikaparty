import { asyncActionStart, asyncActionFinish, asyncActionError } from '../store/actions/asyncActions';

export async function asyncAction(dispatch: any, actionCallback: () => void) {
  dispatch(asyncActionStart());

  try {
    await actionCallback();
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(asyncActionError(err));
  }
}
