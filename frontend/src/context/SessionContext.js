
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { solvers as solverCatalog } from '../solverCatalog/solverDefinitions.js';

/**
 * @typedef {any} Session
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
 * @property {import('../solverCatalog/solverTypes').Solver[]} solvers
 * @property {boolean} loading
 * @property {(goal: string) => Promise<void>} startNewSession
 * @property {Recommendation | null} recommendation
 * @property {(sessionId: string) => Promise<any>} generateRecommendation
 * @property {SolverInputContract | null} solverInputContract
 * @property {(sessionId: string) => Promise<string | undefined>} prepareSolverInput
 * @property {Execution | null} execution
 * @property {Result | null} result
 */

const API_MODE = process.env.REACT_APP_API_MODE || 'firebase';

export const SessionContext = createContext(/** @type {SessionContextValue} */ ({
    session: null,
    solvers: [],
    loading: true,
    startNewSession: async () => {},
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
  const [solvers, setSolvers] = useState(solverCatalog);
  const [loading, setLoading] = useState(true);
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
  }, []);

  const getResult = useCallback(async (resultId) => {
    if (!resultId) return null;
    try {
        const resultDoc = await getDoc(doc(db, "results", resultId));
        const resultData = resultDoc.exists() ? { id: resultDoc.id, ...resultDoc.data() } : null;
        setResult(resultData);
    } catch (error) {
        console.error("Failed to get result:", error);
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
    }
  }, []);

  // Effect to load session and related data from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session');

    if (sessionId) {
        if (!session || session.id !== sessionId) {
            setLoading(true);
            api.getSession(sessionId)
                .then(sessionData => {
                    if (sessionData) {
                      setSession({ id: sessionId, ...sessionData });
                      if (sessionData.recommendationId) {
                          api.getRecommendation(sessionData.recommendationId).then(setRecommendation);
                      }
                      if (sessionData.solverInputId) {
                          getSolverInputContract(sessionData.solverInputId);
                      }
                      if (sessionData.resultId) {
                          getResult(sessionData.resultId);
                      }
                    } else {
                        throw new Error("Session not found");
                    }
                })
                .catch(err => {
                    console.error("Failed to load session:", err);
                    resetState();
                    navigate('/');
                })
                .finally(() => setLoading(false));
        }
    } else {
        resetState();
    }
  }, [location.search, navigate, resetState, getResult, getSolverInputContract, session]);

  // Real-time listener for the session document
  useEffect(() => {
    if (!session?.id || API_MODE !== 'firebase') return;

    const unsubscribe = onSnapshot(doc(db, "sessions", session.id), (doc) => {
      if (doc.exists()) {
        const sessionData = doc.data();
        setSession(prev => ({ ...prev, ...sessionData }));

        if (sessionData.solverInputId && (!solverInputContract || solverInputContract.id !== sessionData.solverInputId)) {
            getSolverInputContract(sessionData.solverInputId);
        }
        if (sessionData.resultId && (!result || result.id !== sessionData.resultId)) {
          getResult(sessionData.resultId);
        }
      }
    });
    return () => unsubscribe();
  }, [session?.id, getResult, result, solverInputContract, getSolverInputContract]);

  const startNewSession = useCallback(async (goal) => {
    if (!goal) return;
    setLoading(true);
    try {
        const { sessionId } = await api.createSession({ goal });
        navigate(`/job-configuration?session=${sessionId}`);
    } catch (error) {
        console.error("Error starting new session:", error);
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
          throw error;
      } finally {
          setLoading(false);
      }
  }, [getSolverInputContract]);

  const value = {
    session,
    solvers,
    loading,
    startNewSession,
    recommendation,
    generateRecommendation,
    solverInputContract,
    prepareSolverInput,
    execution,
    result
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
