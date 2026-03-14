
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { getDb } from '../firebase'; // Corrected import
import { WORKFLOW_STAGES, STAGE_CONFIG } from '../workflow/stages';

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [artifacts, setArtifacts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentStageConfig = session ? STAGE_CONFIG[session.currentStage] : null;

  // Effect to manage session from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session');
    const db = getDb(); // Get db instance here

    if (sessionId && db) { // Check if db is initialized
      setLoading(true);
      const sessionRef = doc(db, 'sessions', sessionId);
      const unsubscribe = onSnapshot(sessionRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const sessionData = { id: docSnap.id, ...docSnap.data() };
            if (!sessionData.currentStage) {
              sessionData.currentStage = WORKFLOW_STAGES.FORMULATE_PROBLEM;
            }
            setSession(sessionData);
            // Navigate to the correct path for the session's stage
            const expectedPath = STAGE_CONFIG[sessionData.currentStage]?.path;
            if (expectedPath && location.pathname !== expectedPath) {
              navigate(`${expectedPath}?session=${sessionId}`, { replace: true });
            }
          } else {
            setError(new Error('Session not found.'));
            setSession(null);
          }
          setLoading(false);
        },
        (err) => {
          console.error("Session snapshot error:", err);
          setError(err);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    } else {
      setSession(null);
      setLoading(false);
    }
  }, [location.search, navigate]);

  // Effect to load session artifacts
  useEffect(() => {
    const db = getDb(); // Get db instance here
    if (session && session.id && db) { // Check if db is initialized
        const artifactsRef = doc(db, `sessions/${session.id}/artifacts`, 'latest');
        const unsubscribe = onSnapshot(artifactsRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    setArtifacts(docSnap.data());
                }
            },
            (err) => {
                console.error("Artifacts snapshot error:", err);
                // Do not set a main error state here, as artifacts may not always exist
            }
        );
        return () => unsubscribe();
    } else {
        setArtifacts({});
    }
  }, [session]);

  // Function to create a new session
  const createNewSession = async (goal) => {
    const db = getDb(); // Get db instance here
    if (!goal || !db) return; // Check if db is initialized
    try {
      const newSessionRef = doc(db, 'sessions', new Date().getTime().toString());
      const newSession = {
        goal: goal,
        createdAt: new Date(),
        currentStage: WORKFLOW_STAGES.FORMULATE_PROBLEM,
      };
      await setDoc(newSessionRef, newSession);
      // CORRECTED: Use bracket notation to access the path property
      const initialPath = STAGE_CONFIG[WORKFLOW_STAGES.FORMULATE_PROBLEM].path;
      navigate(`${initialPath}?session=${newSessionRef.id}`);
    } catch (err) {
      console.error("Error creating new session:", err);
      setError(err);
    }
  };

  // Function to update the current stage of a session
  const updateSession = async (sessionId, newStage) => {
    const db = getDb(); // Get db instance here
    if (!db) return; // Check if db is initialized
    const sessionRef = doc(db, 'sessions', sessionId);
    try {
      await updateDoc(sessionRef, { currentStage: newStage });
    } catch (err) {
      console.error(`Error updating session stage to ${newStage}:`, err);
      setError(err);
    }
  };

  const value = {
    session,
    artifacts,
    loading,
    error,
    currentStageConfig,
    createNewSession,
    updateSession,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
