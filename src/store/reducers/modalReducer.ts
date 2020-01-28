import { MODAL_OPEN, MODAL_CLOSE } from '../actionTypes';
import { createReducer } from '../../utils/createReducer';

const initialState = null;

function openModal(state: any, payload: any) {
  const { modalType, modalProps } = payload;
  return { modalType, modalProps };
};

function closeModal() {
  return null;
};

export default createReducer(initialState, {
  [MODAL_OPEN]: openModal,
  [MODAL_CLOSE]: closeModal
});
