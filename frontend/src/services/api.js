
import { db, functions } from '../firebase';
import { httpsCallable } from 'firebase/functions';
import { 
    doc, 
    getDoc, 
    getDocs, 
    collection, 
    query, 
    orderBy, 
    limit 
} from "firebase/firestore";

const firebaseApi = {
  createSession: async ({ goal }) => {
    const createSessionFn = httpsCallable(functions, 'createSessionFromGoal');
    const result = await createSessionFn({ goal });
    return result.data;
  },

  getSession: async (sessionId) => {
    if (!sessionId) return null;
    const sessionDoc = await getDoc(doc(db, "sessions", sessionId));
    return sessionDoc.exists() ? { id: sessionDoc.id, ...sessionDoc.data() } : null;
  },

  getRecommendation: async (recommendationId) => {
    if (!recommendationId) return null;
    const recDoc = await getDoc(doc(db, "recommendations", recommendationId));
    return recDoc.exists() ? { id: recDoc.id, ...recDoc.data() } : null;
  },

  generateRecommendation: async (sessionId) => {
    const generateRecommendationFn = httpsCallable(functions, 'generateRecommendation');
    const result = await generateRecommendationFn({ sessionId });
    return result.data;
  },

  prepareSolverInput: async (sessionId) => {
    const prepareFunction = httpsCallable(functions, 'prepareSolverInput');
    const response = await prepareFunction({ sessionId });
    return response.data;
  },

  startExecution: async (sessionId, solverInputId) => {
    const startExecutionFn = httpsCallable(functions, 'startExecution');
    const result = await startExecutionFn({ sessionId, solverInputId });
    return result.data; // Returns { executionId: string }
  },

  getHistory: async () => {
    const q = query(collection(db, "sessions"), orderBy("createdAt", "desc"), limit(20));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
};

export const api = firebaseApi;
