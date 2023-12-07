import React, { createContext, useReducer, useEffect } from 'react';
import stateReducer from './stateReducer.js';

const AppContext = createContext();

export const StateProvider = ({ children }) => {
  const initialState = {
    blogPosts: [],
    loggedInUser: null,
  }
  const [store, dispatch] = useReducer(stateReducer, initialState);

  return (
    <AppContext.Provider value={{store, dispatch}} >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext;