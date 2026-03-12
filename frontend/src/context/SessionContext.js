import React, { createContext, useState } from 'react';
import { mockSession } from '../mocks/mockData';

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(mockSession);

  const updateSession = (updates) => {
    setSession(prevSession => ({ ...prevSession, ...updates }));
  };

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
