import { ReactNode, createContext, useReducer } from 'react';
import StateReducers, { INITIAL_STATE } from './reducers';

export const AppContext = createContext<{
  state: object;
  dispatch: React.Dispatch<never>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(StateReducers, INITIAL_STATE);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}
