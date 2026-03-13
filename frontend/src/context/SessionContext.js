
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { solvers as solverCatalog } from '../solverCatalog/solverDefinitions.js';
import { api } from '../services/api';

/**
 * @typedef {import('../solverCatalog/solverTypes').Solver} Solver
 */

/**
 * @typedef {object} Session
 * @property {string} id
 * @property {string} [recommendationId]
 * @property {string} [solverInputId]
 * @property {string} [executionId]
 * @property {string} [resultId]
 */

/**
 * @typedef {any} Recommendation
 */

/**
 * @typedef {any} Execution
 */

/**
 * @typedef {any} Result
 */

/**
 * @typedef {object} SolverInputContract
 * @property {string} id
 * @property {object} schema
 * @property {object} uiSchema
 */

/**
 * @typedef {object} SessionContextValue
 * @property {Session | null} session
 * @property {Solver[]} solvers
 * @property {boolean} loading
 * @property {Error | null} error
 * @property {(goal: string) => Promise<void>} startNewSession
 * @property {() => void} setActiveSession
 * @property {Recommendation | null} recommendation
 * @property {(sessionId: string) => Promise<any>} generateRecommendation
 * @property {SolverInputContract | null} solverInputContract
 * @property {(sessionId: string) => Promise<string | undefined>} prepareSolverInput
 * @property {Execution | null} execution
 * @property {Result | null} result
 */

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
    execution: null,
    result: null,
}));

/**
 * @param {{ children: React.ReactNode }} props
 */
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
    try {
        const executionDoc = await getDoc(doc(db, "executions", executionId));
        const executionData = executionDoc.exists() ? { id: executionDoc.id, ...executionDoc.data() } : null;
        setExecution(executionData);
        // If execution has a resultId, hydrate it.
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
    try {
        const contractDoc = await getDoc(doc(db, "solverInputs", contractId));
        const contractData = contractDoc.exists() ? { id: contractDoc.id, ...contractDoc.data() } : null;
        setSolverInputContract(contractData);
    } catch (error) {
        console.error("Failed to get solver input contract:", error);
        setError(error);
    }
  }, []);

  // Load session and related data from URL or session state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session');

    if (sessionId) {
        if (!session || session.id !== sessionId) {
            setLoading(true);
            const sessionRef = doc(db, 'sessions', sessionId);
            
            const unsub = onSnapshot(sessionRef, async (docSnap) => {
                if (docSnap.exists()) {
                    const sessionData = { id: docSnap.id, ...docSnap.data() };
                    setSession(sessionData);

                    // Hydrate related documents
                    if (sessionData.recommendationId) {
                        api.getRecommendation(sessionData.recommendationId).then(setRecommendation);
                    }
                    if (sessionData.solverInputId) {
                        getSolverInputContract(sessionData.solverInputId);
                    }
                    if (sessionData.executionId) {
                        getExecution(sessionData.executionId);
                    } else {
                      setExecution(null); // Clear if no longer linked
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
    execution,
    result,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
