
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
    return result.data; // Returns { sessionId: string }
  },

  getSession: async (sessionId) => {
    if (!sessionId) return null;
    const sessionDoc = await getDoc(doc(db, "sessions", sessionId));
    return sessionDoc.exists() ? { id: sessionDoc.id, ...sessionDoc.data() } : null;
  },

  generateRecommendation: async (sessionId) => {
    const generateRecommendationFn = httpsCallable(functions, 'generateRecommendation');
    const result = await generateRecommendationFn({ sessionId });
    return result.data; // Returns the full recommendation object
  },

  getRecommendation: async (recommendationId) => {
    if (!recommendationId) return null;
    const recDoc = await getDoc(doc(db, "recommendations", recommendationId));
    return recDoc.exists() ? { id: recDoc.id, ...recDoc.data() } : null;
  },

  startExecution: async (sessionId, config) => {
    const startExecutionFn = httpsCallable(functions, 'startExecution');
    const result = await startExecutionFn({ sessionId, config });
    return result.data; // Returns { executionId: string }
  },

  finalizeExecution: async (sessionId, solverId) => {
    const finalizeExecutionFn = httpsCallable(functions, 'finalizeExecution');
    const result = await finalizeExecutionFn({ sessionId, solverId });
    return result.data; // Returns { executionId: string, resultId: string }
  },

  getHistory: async () => {
    const q = query(collection(db, "sessions"), orderBy("createdAt", "desc"), limit(20));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  getSolvers: async () => {
    const solversSnapshot = await getDocs(collection(db, "solvers"));
    return solversSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

export const api = firebaseApi;
