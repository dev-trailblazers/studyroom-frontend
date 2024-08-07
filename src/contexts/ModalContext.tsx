import { createContext, useReducer, ReactNode, Dispatch, useMemo } from 'react';

type ModalState = {
  [key: string]: number;
};

type ModalAction =
  | { type: 'OPEN_MODAL'; modalName: string }
  | { type: 'CLOSE_MODAL'; modalName: string };

const initialState: ModalState = {};

export const ModalContext = createContext<{
  state: ModalState;
  dispatch: Dispatch<ModalAction>;
}>({ state: initialState, dispatch: () => undefined });

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        [action.modalName]: Math.max(...Object.values(state), 0) + 1,
      };
    case 'CLOSE_MODAL': {
      const newState = { ...state };
      delete newState[action.modalName];
      return newState;
    }
    default:
      return state;
  }
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
