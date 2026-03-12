
import { mockApi } from '../mocks/api';
import { db, functions } from '../firebase';
import { httpsCallable } from 'firebase/functions';
import { 
    doc, 
    getDoc, 
    getDocs, 
    collection, 
    query, 
    orderBy, 
    limit, 
    updateDoc 
} from "firebase/firestore";

// --- Configuration ---
// 'mock' or 'firebase'. Defaults to 'mock'
const API_MODE = process.env.REACT_APP_API_MODE || 'mock';

// --- Firebase API Implementation ---

const firebaseApi = {
  createSession: async (req) => {
    const createSessionFn = httpsCallable(functions, 'createSessionFromGoal');
    const result = await createSessionFn({ goal: req.goal });
    // The function returns a session object, but we need to fetch the doc to get a proper snapshot
    const sessionDoc = await getDoc(doc(db, "sessions", result.data.id));
    return { id: sessionDoc.id, ...sessionDoc.data() };
  },

  getRecommendation: async (req) => {
    const generateRecommendationFn = httpsCallable(functions, 'generateRecommendation');
    await generateRecommendationFn({ sessionId: req.sessionId });
    const recDoc = await getDoc(doc(db, "recommendations", req.sessionId));
    return { id: recDoc.id, ...recDoc.data() };
  },

  submitJob: async (req) => {
    const { sessionId, config } = req;
    // Persist the selected method on the session
    await updateDoc(doc(db, "sessions", sessionId), {
        selectedPath: config.path, // 'recommended' or 'alternative'
        selectedMethod: config.method, 
        currentStage: 'execution'
    });
    
    const startExecutionFn = httpsCallable(functions, 'startExecution');
    const result = await startExecutionFn({ sessionId });
    const jobData = result.data;

    // In this flow, the job object is part of the session context, so we return it
    return { ...jobData, config }; // Include the config for UI purposes
  },

  // This function is no longer single-purpose; it's part of the session data.
  // Real-time listener will be used in the UI instead of this poll-based function.
  getJobStatus: async (jobId, session) => {
    const execDoc = await getDoc(doc(db, "executions", session.id));
    return execDoc.data(); 
  },

  getResults: async (jobId, session) => {
    const resultDoc = await getDoc(doc(db, "results", session.id));
    return resultDoc.data();
  },

  getHistory: async () => {
    const q = query(collection(db, "sessions"), orderBy("createdAt", "desc"), limit(20));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // A new helper to get a single session for resuming
  getSession: async (sessionId) => {
    const sessionDoc = await getDoc(doc(db, "sessions", sessionId));
    const recommendationDoc = await getDoc(doc(db, "recommendations", sessionId));
    const executionDoc = await getDoc(doc(db, "executions", sessionId));
    const resultsDoc = await getDoc(doc(db, "results", sessionId));

    return {
        id: sessionDoc.id,
        ...sessionDoc.data(),
        // Attach related data if it exists
        recommendation: recommendationDoc.exists() ? recommendationDoc.data() : null,
        job: executionDoc.exists() ? { id: executionDoc.id, ...executionDoc.data(), results: resultsDoc.exists() ? resultsDoc.data() : null } : null,
    };
  },
};

// --- Export the appropriate API implementation ---

export const api = API_MODE === 'firebase' ? firebaseApi : mockApi;
