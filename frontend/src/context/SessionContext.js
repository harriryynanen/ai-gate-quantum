
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';

const API_MODE = process.env.REACT_APP_API_MODE || 'mock';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // This effect handles loading a session from a URL or creating a new one.
  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get('session');
    if (sessionId) {
        if (!session || session.id !== sessionId) {
            api.getSession(sessionId)
                .then(setSession)
                .finally(() => setLoading(false));
        }
    } else {
        setSession(null); // No session ID, no active session
        setLoading(false);
    }
  }, [location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  // This effect sets up a real-time listener for the current session's execution data
  useEffect(() => {
    if (session?.id && API_MODE === 'firebase') {
      const unsubscribe = onSnapshot(doc(db, "executions", session.id), (doc) => {
        if (doc.exists()) {
          console.log("Real-time execution update:", doc.data());
          setSession(prev => {
              if (!prev || !prev.job) return prev; // Should not happen
              // Merge new execution data into the existing job object
              const updatedJob = { ...prev.job, ...doc.data() };
              return { ...prev, job: updatedJob };
          });
        }
      });

      // Cleanup listener on unmount or session change
      return () => unsubscribe();
    }
  }, [session?.id]);

  // A new way to start a session that works with Firebase
  const startNewSession = useCallback(async (goal) => {
    if (!goal) return;
    setLoading(true);
    try {
        const newSession = await api.createSession({ goal });
        setSession(newSession);
        navigate(`/data-preparation?session=${newSession.id}`);
    } catch (error) {
        console.error("Error starting new session:", error);
    } finally {
        setLoading(false);
    }
  }, [navigate]);

  const value = { session, setSession, loading, startNewSession };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
