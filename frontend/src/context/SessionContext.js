
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const SessionContext = createContext(null);

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to create a new session
  const createSession = useCallback(async (goal) => {
    try {
      setLoading(true);
      const newSession = await api.createSession({ goal });
      setSession(newSession);
      setError(null);
      return newSession;
    } catch (err) {
      setError('Failed to create session');
      console.error(err);
    }
    finally {
        setLoading(false);
    }
  }, []);

  // On initial load, create a default session for demonstration
  useEffect(() => {
    if (!session) {
      createSession('Default financial risk analysis session');
    }
  }, [createSession, session]);

  const value = {
    session,
    setSession, // Allow components to update session state
    createSession,
    loading,
    error
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
