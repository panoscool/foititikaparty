import { MODAL_OPEN, MODAL_CLOSE } from '../actionTypes';

export const openModal = (modalType: any, modalProps?: any) => ({
  type: MODAL_OPEN,
  payload: {
    modalType,
    modalProps
  }
})

export const closeModal = () => ({
  type: MODAL_CLOSE
})
