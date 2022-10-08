import { createContext, useState } from 'react';

const authContext = createContext();

export const authProvider = ({ children }) => {
  return (
    <authContext.Provider value={{ user: {} }}>
      {{ children }}
    </authContext.Provider>
  );
};

export default authContext;
