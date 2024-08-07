import { useCallback, useEffect } from 'react';
import { useModalContext } from './useModalContext';

export const useModal = (modalName: string) => {
  const { state, dispatch } = useModalContext();
  const isOpen = state[modalName] > 0;
  const zIndex = state[modalName] || 0;

  useEffect(() => {
    const anyModalOpen = Object.values(state).some((value) => value > 0);

    if (anyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      if (!anyModalOpen) {
        document.body.style.overflow = '';
      }
    };
  }, [state]);

  const openModal = useCallback(
    () => dispatch({ type: 'OPEN_MODAL', modalName }),
    [dispatch, modalName]
  );

  const closeModal = useCallback(
    () => dispatch({ type: 'CLOSE_MODAL', modalName }),
    [dispatch, modalName]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) closeModal();
    },
    [closeModal]
  );

  return { isOpen, openModal, closeModal, handleOverlayClick, zIndex };
};
