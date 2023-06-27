import { createContext, useContext, useReducer } from 'react';

const StateProvider = createContext({});

export const useStateValue = () => useContext(StateProvider);

const StateContext = ({ initialState, reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const values = { state, dispatch };

  return (
    <StateProvider.Provider value={values}>{children}</StateProvider.Provider>
  );
};
export default StateContext;
