
import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
  admin.initializeApp();
}

// --- Interfaces ---

interface Execution {
  sessionId: string;
  userId: string;
  solverInputId: string;
  status: "queued" | "running" | "completed" | "failed";
  createdAt: admin.firestore.FieldValue;
  config: { solverId?: string };
  logs: { timestamp: Date, message: string }[];
  resultsSummary?: Record<string, unknown> | null;
}

// ... other interfaces ...


// ... other functions (startExecution, etc.) ...
export { prepareSolverInput, executeSolver } from './solver';
