
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { WORKFLOW_STAGES, STAGE_CONFIG } from '../workflow/stages';

// Create a context with a default shape
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentStageConfig, setCurrentStageConfig] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const fetchHistory = useCallback(async () => {
        try {
            const sessionHistory = await api.getHistory();
            setHistory(sessionHistory || []);
        } catch (err) {
            setError(new Error(`Failed to load session history: ${err.message}`));
        }
    }, []);

    const navigateToStage = useCallback((stage, sessionId) => {
        const stageConfig = STAGE_CONFIG[stage];
        const targetPath = `${stageConfig.path}?session=${sessionId}`;
        if (window.location.pathname + window.location.search !== targetPath) {
            navigate(targetPath);
        }
    }, [navigate]);

    const loadSession = useCallback(async (sessionId) => {
        if (!sessionId) {
            setLoading(false);
            return;
        }

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
            navigateToStage(loadedSession.currentStage, sessionId);

        } catch (err) {
            setError(new Error(`Failed to load session ${sessionId}: ${err.message}`));
            navigate('/'); // Redirect to dashboard on error
        } finally {
            setLoading(false);
        }
    }, [navigate, navigateToStage]);

    // Effect to handle initial session loading from URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sessionId = params.get('session');
        if (sessionId && (!session || session.id !== sessionId)) {
            loadSession(sessionId);
        } else if (!sessionId) {
            setSession(null);
            setArtifacts({});
        }
        // Fetch history on initial load
        fetchHistory();
    }, [location.search, session, loadSession, fetchHistory]);

    const startNewSession = async (goal) => {
        setLoading(true);
        setError(null);
        try {
            // Use the corrected contract: { goal: string }
            const newSession = await api.createSession({ goal });
            setSession(newSession);
            setArtifacts({}); // Reset artifacts for the new session
            await fetchHistory(); // Refresh history list
            
            const stageConfig = STAGE_CONFIG[newSession.currentStage];
            setCurrentStageConfig(stageConfig);
            navigateToStage(newSession.currentStage, newSession.id);

        } catch (err) {
            const newError = new Error(`Failed to start new session: ${err.message}`);
            setError(newError);
            throw newError;
        } finally {
            setLoading(false);
        }
    };

    const updateSession = async (sessionId, targetStage, payload = {}) => {
        setLoading(true);
        setError(null);
        try {
            const updateData = { ...payload, currentStage: targetStage };
            const updatedSession = await api.updateSession(sessionId, updateData);
            setSession(updatedSession);
            
            // Reload artifacts as the update may have generated new ones
            const sessionArtifacts = await api.getArtifacts(sessionId);
            setArtifacts(sessionArtifacts || {});

            const stageConfig = STAGE_CONFIG[updatedSession.currentStage];
            setCurrentStageConfig(stageConfig);
            navigateToStage(updatedSession.currentStage, sessionId);

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
