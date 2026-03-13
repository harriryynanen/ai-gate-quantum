
import { getDb, getFunctionsService } from '../firebase';
import { httpsCallable } from 'firebase/functions';
import { 
    doc, 
    getDoc,
    updateDoc,
    addDoc,
    collection,
    serverTimestamp,
    query,
    orderBy,
    limit,
    getDocs
} from "firebase/firestore";

// A helper function to get a document from a specific collection
const getDocument = async (collectionName, docId) => {
    if (!docId) return null;
    const db = getDb();
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

const firebaseApi = {
    // --- Session Management ---
    createSession: async (sessionData) => {
        const db = getDb();
        const sessionRef = await addDoc(collection(db, "sessions"), {
            ...sessionData,
            createdAt: serverTimestamp(),
        });
        return { sessionId: sessionRef.id };
    },

    updateSession: async (sessionId, data) => {
        const db = getDb();
        const sessionRef = doc(db, 'sessions', sessionId);
        return await updateDoc(sessionRef, data);
    },

    // --- Artifact Fetching ---
    getSession: (sessionId) => getDocument("sessions", sessionId),
    getFormulation: (formulationId) => getDocument("formulations", formulationId),
    getRecommendation: (recommendationId) => getDocument("recommendations", recommendationId),
    getSolverInput: (solverInputId) => getDocument("solverInputs", solverInputId),
    getExecution: (executionId) => getDocument("executions", executionId),
    getResult: (resultId) => getDocument("results", resultId),

    // --- History ---
    getHistory: async () => {
        const db = getDb();
        const q = query(collection(db, "sessions"), orderBy("createdAt", "desc"), limit(20));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // --- Callable Functions (for backend operations) ---
    generateRecommendation: async (sessionId) => {
        const functions = getFunctionsService();
        const generateRecommendationFn = httpsCallable(functions, 'generateRecommendation');
        const result = await generateRecommendationFn({ sessionId });
        return result.data;
    },

    prepareSolverInput: async (sessionId) => {
        const functions = getFunctionsService();
        const prepareFunction = httpsCallable(functions, 'prepareSolverInput');
        const response = await prepareFunction({ sessionId });
        return response.data; // Expects { solverInputId: string }
    },

    executeSolver: async (sessionId, solverInputId) => {
        const functions = getFunctionsService();
        const executeSolverFn = httpsCallable(functions, 'executeSolver');
        const result = await executeSolverFn({ sessionId, solverInputId });
        return result.data; // Expects { executionId: string }
    },
};

export const api = firebaseApi;
