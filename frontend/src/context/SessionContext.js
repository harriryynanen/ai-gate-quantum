import React, { createContext, useState } from 'react';
import { mockExecution } from '../mocks/mockData'; // Corrected import

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  // Initialize state with the correctly imported data
  const [session, setSession] = useState(mockExecution);

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
