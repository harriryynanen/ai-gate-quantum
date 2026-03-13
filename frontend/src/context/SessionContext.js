
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { onSnapshot, doc, getDoc } from 'firebase/firestore';
import { getDb } from '../firebase'; // Use the getter
import { solvers as solverCatalog } from '../solverCatalog/solverDefinitions.js';
import { api } from '../services/api';

// ... (typedefs remain the same) ...

export const SessionContext = createContext(/** @type {SessionContextValue} */ ({
    session: null,
    solvers: [],
    loading: true,
    error: null,
    startNewSession: async () => {},
    setActiveSession: () => {},
    recommendation: null,
    generateRecommendation: async () => {},
    solverInputContract: null,
    prepareSolverInput: async () => undefined,
    executeSolver: async () => undefined,
    execution: null,
    result: null,
}));

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(/** @type {Session | null} */ (null));
  const [solvers] = useState(solverCatalog);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendation, setRecommendation] = useState(/** @type {Recommendation | null} */ (null));
  const [solverInputContract, setSolverInputContract] = useState(/** @type {SolverInputContract | null} */ (null));
  const [execution, setExecution] = useState(/** @type {Execution | null} */ (null));
  const [result, setResult] = useState(/** @type {Result | null} */ (null));
  const location = useLocation();
  const navigate = useNavigate();

  const resetState = useCallback(() => {
    setSession(null);
    setRecommendation(null);
    setSolverInputContract(null);
    setExecution(null);
    setResult(null);
    setLoading(false);
    setError(null);
  }, []);

  const getExecution = useCallback(async (executionId) => {
    if (!executionId) return null;
    const db = getDb();
    try {
        const executionDoc = await getDoc(doc(db, "executions", executionId));
        const executionData = executionDoc.exists() ? { id: executionDoc.id, ...executionDoc.data() } : null;
        setExecution(executionData);
        if (executionData?.resultId) {
            await getResult(executionData.resultId);
        }
    } catch (error) {
        console.error("Failed to get execution:", error);
        setError(error);
    }
  }, []);

  const getResult = useCallback(async (resultId) => {
    if (!resultId) return null;
    const db = getDb();
    try {
        const resultDoc = await getDoc(doc(db, "results", resultId));
        const resultData = resultDoc.exists() ? { id: resultDoc.id, ...resultDoc.data() } : null;
        setResult(resultData);
    } catch (error) {
        console.error("Failed to get result:", error);
        setError(error);
    }
  }, []);

  const getSolverInputContract = useCallback(async (contractId) => {
    if (!contractId) return null;
    const db = getDb();
    try {
        const contractDoc = await getDoc(doc(db, "solverInputs", contractId));
        const contractData = contractDoc.exists() ? { id: contractDoc.id, ...contractDoc.data() } : null;
        setSolverInputContract(contractData);
    } catch (error) {
        console.error("Failed to get solver input contract:", error);
        setError(error);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session');
    const db = getDb(); // Get db instance here

    if (sessionId) {
        if (!session || session.id !== sessionId) {
            setLoading(true);
            const sessionRef = doc(db, 'sessions', sessionId);
            
            const unsub = onSnapshot(sessionRef, async (docSnap) => {
                if (docSnap.exists()) {
                    const sessionData = { id: docSnap.id, ...docSnap.data() };
                    setSession(sessionData);

                    if (sessionData.recommendationId) {
                        api.getRecommendation(sessionData.recommendationId).then(setRecommendation);
                    }
                    if (sessionData.solverInputId) {
                        getSolverInputContract(sessionData.solverInputId);
                    }
                    if (sessionData.latestExecutionId) {
                        getExecution(sessionData.latestExecutionId);
                    } else {
                      setExecution(null);
                    }

                } else {
                    setError(new Error("Session not found"));
                    resetState();
                    navigate('/');
                }
                setLoading(false);
            }, (err) => {
                console.error("Error listening to session:", err);
                setError(err);
                resetState();
                navigate('/');
            });

            return () => unsub();
        }
    } else {
        resetState();
    }
  }, [location.search, navigate, resetState, getExecution, getSolverInputContract, session]);


  const startNewSession = useCallback(async (goal) => {
    if (!goal) return;
    setLoading(true);
    try {
        const { sessionId } = await api.createSession({ goal });
        navigate(`/data-preparation?session=${sessionId}`);
    } catch (error) {
        console.error("Error starting new session:", error);
        setError(error);
    } finally {
        setLoading(false);
    }
  }, [navigate]);

  const generateRecommendation = useCallback(async (sessionId) => {
    if (!sessionId) return;
    try {
      const rec = await api.generateRecommendation(sessionId);
      setRecommendation(rec);
      setSession(prev => ({...prev, status: 'analyzed', currentStage: 'method'}));
      return rec;
    } catch (error) {
      console.error("Error generating recommendation:", error);
      setError(error);
      throw error;
    }
  }, []);

  const prepareSolverInput = useCallback(async (sessionId) => {
      if (!sessionId) return;
      setLoading(true);
      try {
          const { solverInputId } = await api.prepareSolverInput(sessionId);
          if (solverInputId) {
              await getSolverInputContract(solverInputId);
          }
          return solverInputId;
      } catch (error) {
          console.error("Error preparing solver input:", error);
          setError(error);
          throw error;
      } finally {
          setLoading(false);
      }
  }, [getSolverInputContract]);

  const executeSolver = useCallback(async (sessionId, solverInputId) => {
      if (!sessionId || !solverInputId) return;
      setLoading(true);
      try {
          const { executionId } = await api.executeSolver(sessionId, solverInputId);
          if (executionId) {
              await getExecution(executionId);
              navigate(`/results?session=${sessionId}`);
          }
          return executionId;
      } catch (error) {
          console.error("Error executing solver:", error);
          setError(error);
          throw error;
      } finally {
          setLoading(false);
      }
  }, [getExecution, navigate]);


  const setActiveSession = useCallback((sessionId) => {
      navigate(`?session=${sessionId}`);
  }, [navigate]);

  const value = {
    session,
    solvers,
    loading,
    error,
    startNewSession,
    setActiveSession, 
    recommendation,
    generateRecommendation,
    solverInputContract,
    prepareSolverInput,
    executeSolver,
    execution,
    result,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
