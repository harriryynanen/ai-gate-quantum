
import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On initial load, try to create a new session.
    const initializeSession = async () => {
      try {
        // In a real app, you might check localStorage for an existing session ID.
        const newSession = await api.createSession({ goal: "Initial exploratory session" });
        setSession(newSession);
      } catch (error) {
        console.error("Failed to initialize session:", error);
        // Handle error state appropriately in a real app
      } finally {
        setLoading(false);
      }
    };

    if (!session) {
        initializeSession();
    }

  }, [session]);

  const value = { 
    session, 
    setSession, 
    loading, 
    // Function to update job status within the session
    updateJobStatus: (job) => {
        if (session) {
            setSession({ ...session, job });
        }
    },
    // Function to attach results to the session
    setJobResults: (results) => {
        if (session && session.job) {
            setSession({ ...session, job: { ...session.job, results }});
        }
    }
  };

  return (
    <SessionContext.Provider value={value}>
      {!loading && children}
    </SessionContext.Provider>
  );
};
