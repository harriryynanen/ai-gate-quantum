
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

let app, auth, db, functions, firebaseInitialized = false;

// Function to check if the config values are placeholders
const isConfigured = () => {
    return (
        firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your_api_key' &&
        firebaseConfig.projectId && firebaseConfig.projectId !== 'your_project_id'
    );
};

export const initFirebase = () => {
    if (isConfigured() && !app) {
        try {
            app = initializeApp(firebaseConfig);
            auth = getAuth(app);
            db = getFirestore(app);
            functions = getFunctions(app);
            firebaseInitialized = true;
            console.log("Firebase initialized successfully");
        } catch (error) {
            console.error("Firebase initialization failed:", error);
            firebaseInitialized = false;
        }
    } else if (!isConfigured()) {
        console.warn("Firebase config is not set. Running in offline mode.");
    }
    return firebaseInitialized;
}

// Export a function that returns the initialized status
export const isFirebaseInitialized = () => firebaseInitialized;

// Export services as functions to ensure they are accessed after initialization
export const getApp = () => app;
export const getDb = () => db;
export const getAuthService = () => auth;
export const getFunctionsService = () => functions;
