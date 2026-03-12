
import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
  admin.initializeApp();
}
const db = admin.firestore();

// --- Mock Result Generators ---

const generateClassicalBaselineResults = () => ({
  summary: "The classical solver found a straightforward solution by iterating through the most probable options.",
  objectiveValue: Math.round(Math.random() * 200 + 100),
  iterations: Math.floor(Math.random() * 1000) + 500,
  solverRuntime: (Math.random() * 2 + 0.5).toFixed(3) + "s",
  warnings: null,
});

const generateQuantumInspiredResults = () => ({
  summary: "Quantum-inspired annealing explored a vast solution space, settling into a low-energy configuration.",
  objectiveValue: Math.round(Math.random() * 50 + 20),
  effectiveQubits: 256,
  annealingTime: (Math.random() * 1000 + 200).toFixed(0) + "µs",
  energyDelta: (Math.random() * -10 - 1).toFixed(2),
});

const generateQAOAResults = () => ({
  summary: "QAOA candidate search identified a promising circuit configuration (p=2) for this problem class.",
  objectiveValue: Math.round(Math.random() * 80 + 10),
  circuitDepth: 4,
  shots: 4096,
  mostProbableSolution: "[1, 0, 1, 1, 0]",
  confidenceScore: Math.random(),
});

const getMockResultsForSolver = (solverId: string | undefined) => {
  switch (solverId) {
    case 'classical-baseline':
      return generateClassicalBaselineResults();
    case 'quantum-inspired-annealing':
      return generateQuantumInspiredResults();
    case 'qaoa-candidate-search':
      return generateQAOAResults();
    default:
      return {
        summary: "The optimization process identified a viable solution with a significant improvement over the baseline.",
        objectiveValue: Math.round(Math.random() * 1000) / 100,
        iterations: Math.floor(Math.random() * 50) + 10,
        solverRuntime: (Math.random() * 5 + 1).toFixed(3) + "s",
        confidenceScore: Math.random()
      };
  }
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

// --- Firestore Trigger for Mock Execution ---

export const _mock_executionWorker = onDocumentCreated("executions/{executionId}", async (event) => {
  const snap = event.data;
  if (!snap) {
    logger.info("No data associated with the event");
    return;
  }
  
  const execution = snap.data() as Execution;
  const executionId = event.params.executionId;
  const executionRef = db.collection("executions").doc(executionId);

  if (execution.status !== 'queued') {
    return;
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    await executionRef.update({
      status: "running",
      startedAt: admin.firestore.FieldValue.serverTimestamp(),
      'logs': admin.firestore.FieldValue.arrayUnion({ timestamp: new Date(), message: `Solver process started using solver: ${execution.config.solverId || 'default'}. Simulating computation...` })
    });

    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate solver-aware mock results
    const mockResults = getMockResultsForSolver(execution.config.solverId);

    await executionRef.update({
      status: "completed",
      completedAt: admin.firestore.FieldValue.serverTimestamp(),
      resultsSummary: mockResults,
      'logs': admin.firestore.FieldValue.arrayUnion({ timestamp: new Date(), message: `Execution finished. Objective value: ${mockResults.objectiveValue}` })
    });
    
    const sessionRef = db.collection("sessions").doc(execution.sessionId);
    await sessionRef.update({
      status: "completed",
      currentStage: "results",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    logger.info(`Mock execution completed for ${executionId} with solver ${execution.config.solverId}`);

  } catch (error) {
    logger.error(`Error in mock execution worker for ${executionId}:`, error);
    await executionRef.update({ status: "failed" });
  }
});

// ... other functions (startExecution, etc.) ...
export * from "./session";
export { prepareSolverInput } from './solver';
