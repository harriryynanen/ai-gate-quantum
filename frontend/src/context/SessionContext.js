
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';

const API_MODE = process.env.REACT_APP_API_MODE || 'firebase';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [solvers, setSolvers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState(null);
  const [execution, setExecution] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const resetState = () => {
    setSession(null);
    setRecommendation(null);
    setExecution(null);
    setLoading(false);
  }

  // Load solver catalog on initial mount
  useEffect(() => {
    api.getSolvers()
      .then(setSolvers)
      .catch(err => {
        console.error("Failed to load solvers:", err);
      });
  }, []);

  // This effect handles loading a session from a URL
  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get('session');
    if (sessionId) {
        if (!session || session.id !== sessionId) {
            setLoading(true);
            api.getSession(sessionId)
                .then(sessionData => {
                    setSession({ ...sessionData, id: sessionId }); // Add id to session object
                    if (sessionData.recommendationId) {
                        api.getRecommendation(sessionData.recommendationId).then(setRecommendation);
                    }
                    if (sessionData.executionId) {
                        // Initial load, listener will handle updates
                    }
                })
                .catch(err => {
                    console.error("Failed to load session:", err);
                    resetState();
                })
                .finally(() => setLoading(false));
        }
    } else {
        resetState();
    }
  }, [location.search, session]);

  // This effect sets up a real-time listener for the current session's execution data
  useEffect(() => {
    if (session?.executionId && API_MODE === 'firebase') {
      const unsubscribe = onSnapshot(doc(db, "executions", session.executionId), (doc) => {
        if (doc.exists()) {
          console.log("Real-time execution update:", doc.data());
          setExecution(doc.data());
        } else {
          setExecution(null);
        }
      });

      // Cleanup listener on unmount or session change
      return () => unsubscribe();
    }
  }, [session?.executionId]);

  const startNewSession = useCallback(async (goal) => {
    if (!goal) return;
    setLoading(true);
    try {
        const { sessionId } = await api.createSession({ goal });
        const newSession = await api.getSession(sessionId);
        setSession({ ...newSession, id: sessionId });
        navigate(`/job-configuration?session=${sessionId}`);
        // The recommendation will be generated and loaded via the JobConfiguration page
    } catch (error) {
        console.error("Error starting new session:", error);
        throw error;
    } finally {
        setLoading(false);
    }
  }, [navigate]);

  const generateRecommendation = useCallback(async (sessionId) => {
    if (!sessionId) return;
    try {
      const rec = await api.generateRecommendation(sessionId);
      setRecommendation(rec);
      return rec;
    } catch (error) {
      console.error("Error generating recommendation:", error);
      throw error;
    }
  }, []);


  const value = { 
    session, 
    solvers,
    loading, 
    startNewSession, 
    recommendation, 
    generateRecommendation,
    execution 
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
