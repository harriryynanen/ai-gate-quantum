
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { WORKFLOW_STAGES, STAGE_CONFIG } from '../workflow/stages';

// Create a context with a default shape to avoid destructuring errors on initial render
export const SessionContext = createContext({
  session: null,
  artifacts: {},
  history: [],
  loading: true,
  error: null,
  currentStageConfig: null,
  startNewSession: async () => {},
  loadSession: async () => {},
  updateSession: async () => {},
});

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [artifacts, setArtifacts] = useState({});
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentStageConfig, setCurrentStageConfig] = useState(null);

    const navigate = useNavigate();

    const fetchHistory = useCallback(async () => {
        try {
            const sessionHistory = await api.getHistory();
            setHistory(sessionHistory || []);
        } catch (err) {
            setError(new Error(`Failed to load session history: ${err.message}`));
        }
    }, []);

    const loadSession = useCallback(async (sessionId) => {
        setLoading(true);
        setError(null);
        try {
            const loadedSession = await api.getSession(sessionId);
            if (!loadedSession) {
                throw new Error("Session not found.");
            }
            setSession(loadedSession);

            const sessionArtifacts = await api.getArtifacts(sessionId);
            setArtifacts(sessionArtifacts || {});
            
            const stageConfig = STAGE_CONFIG[loadedSession.currentStage];
            setCurrentStageConfig(stageConfig);
            navigate(`${stageConfig.path}?session=${sessionId}`);

        } catch (err) {
            setError(new Error(`Failed to load session ${sessionId}: ${err.message}`));
            navigate('/');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchHistory();
        
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session');
        
        if (sessionId && (!session || session.id !== sessionId)) {
            loadSession(sessionId);
        } else {
            setLoading(false);
        }
    }, [loadSession, fetchHistory]); // Removed session dependency to avoid re-running on session state change

    // Handles session updates and navigation
    const handleSessionUpdate = useCallback((updatedSession) => {
        setSession(updatedSession);
        const stageConfig = STAGE_CONFIG[updatedSession.currentStage];
        const currentPath = window.location.pathname;

        if (stageConfig && stageConfig.path !== currentPath) {
            navigate(`${stageConfig.path}?session=${updatedSession.id}`);
        }
    }, [navigate]);

    const startNewSession = async (goal) => {
        setLoading(true);
        setError(null);
        try {
            const newSession = await api.createSession(goal);
            setSession(newSession);
            setArtifacts({});
            await fetchHistory();
            
            const stageConfig = STAGE_CONFIG[newSession.currentStage];
            setCurrentStageConfig(stageConfig);
            navigate(`${stageConfig.path}?session=${newSession.id}`);
        } catch (err) {
            setError(new Error(`Failed to start new session: ${err.message}`));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateSession = async (sessionId, targetStage, payload = {}) => {
        setLoading(true);
        try {
            const updatedSession = await api.updateSession(sessionId, targetStage, payload);
            setSession(updatedSession);
            // Reload artifacts as they might have changed
            const sessionArtifacts = await api.getArtifacts(sessionId);
            setArtifacts(sessionArtifacts || {});

            const stageConfig = STAGE_CONFIG[updatedSession.currentStage];
            setCurrentStageConfig(stageConfig);

            if (stageConfig.path !== window.location.pathname) {
                navigate(`${stageConfig.path}?session=${sessionId}`);
            }
        } catch (err) {
            setError(new Error(`Failed to update session: ${err.message}`));
        } finally {
            setLoading(false);
        }
    };


    const contextValue = {
        session,
        artifacts,
        loading,
        error,
        history,
        startNewSession,
        loadSession,
        updateSession,
        currentStageConfig,
    };

    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    );
};
