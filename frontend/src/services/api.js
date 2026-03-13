
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
    createSession: async ({ goal }) => {
        if (!goal || typeof goal !== 'string' || goal.trim() === '') {
            throw new Error('A non-empty goal string is required to create a session.');
        }
        const db = getDb();
        const sessionRef = await addDoc(collection(db, "sessions"), {
            goal: goal,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            currentStage: 'problem_formulation', // Start at the first stage
        });
        const newSession = await getDoc(sessionRef);
        return { id: newSession.id, ...newSession.data() };
    },

    updateSession: async (sessionId, data) => {
        const db = getDb();
        const sessionRef = doc(db, 'sessions', sessionId);
        await updateDoc(sessionRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
        const updatedSession = await getDoc(sessionRef);
        return { id: updatedSession.id, ...updatedSession.data() };
    },

    getSession: (sessionId) => getDocument("sessions", sessionId),

    // --- Artifact Fetching ---
    getArtifacts: async (sessionId) => {
        if (!sessionId) return {};
        const session = await getDocument("sessions", sessionId);
        if (!session) return {};

        const artifactIds = {
            formulation: session.formulationId,
            recommendation: session.recommendationId,
            solverInput: session.solverInputId,
            execution: session.executionId,
            result: session.resultId,
        };

        const artifactPromises = Object.entries(artifactIds).map(async ([key, id]) => {
            if (!id) return [key, null];
            // The key of the artifact tells us the collection name (e.g., 'formulation' -> 'formulations')
            const collectionName = `${key}s`; 
            const artifact = await getDocument(collectionName, id);
            return [key, artifact];
        });
        
        const artifacts = Object.fromEntries(await Promise.all(artifactPromises));
        return artifacts;
    },

    // --- History ---
    getHistory: async () => {
        const db = getDb();
        const q = query(collection(db, "sessions"), orderBy("createdAt", "desc"), limit(20));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // --- Callable Functions (for backend operations) ---
    // These remain unchanged as they are for backend logic which is out of scope for this step.
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
        return response.data;
    },

    executeSolver: async (sessionId, solverInputId) => {
        const functions = getFunctionsService();
        const executeSolverFn = httpsCallable(functions, 'executeSolver');
        const result = await executeSolverFn({ sessionId, solverInputId });
        return result.data;
    },
};

export const api = firebaseApi;
