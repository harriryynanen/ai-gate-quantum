import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// Initialize Firebase Admin
admin.initializeApp();

// --- Interfaces for Firestore documents ---

interface Session {
  userId: string;
  title: string;
  goal: string;
  status: "new" | "analyzing" | "analyzed" | "queued" | "running" | "completed" | "error";
  currentStage: "goal" | "method" | "data" | "config" | "execute" | "results";
  createdAt: admin.firestore.FieldValue;
  updatedAt: admin.firestore.FieldValue;
  recommendationId?: string;
  executionId?: string;
}

interface Recommendation {
  sessionId: string;
  problemType: string;
  dataReadiness: "high" | "medium" | "low";
  recommendedPath: "classical" | "quantum" | "hybrid";
  alternativePath?: "classical" | "quantum" | "hybrid";
  recommendationStrength: "high" | "medium" | "low";
  confidence: number;
  reasoningSummary: string;
  quantumFitRationale: string;
  classicalFitRationale: string;
  tradeoffs: string;
  assumptions: string[];
  blockers: string[];
  requiredInputs: string[];
  overrideAllowed: boolean;
  explorationVsProduction: "exploration" | "production-ready" | "insufficient-information";
  recommendationWarnings?: string[];
  generatedAt: admin.firestore.FieldValue;
  source: string;
}

interface Execution {
  sessionId: string;
  status: "queued" | "running" | "completed" | "failed";
  createdAt: admin.firestore.FieldValue;
  startedAt?: admin.firestore.FieldValue;
  completedAt?: admin.firestore.FieldValue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: Record<string, any> | null;
}

// --- Callable Functions (V1 Syntax, Final Attempt) ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSessionFromGoal = functions.https.onCall(async (data: any, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
  }

  const goal = data.goal as string;
  const userId = context.auth.uid;

  if (!goal || typeof goal !== "string" || goal.trim().length === 0) {
    throw new functions.https.HttpsError("invalid-argument", "The function must be called with a non-empty 'goal' string.");
  }

  try {
    const session: Session = {
      userId,
      title: `New Session: ${goal.substring(0, 30)}...`,
      goal,
      status: "new",
      currentStage: "goal",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const sessionRef = await admin.firestore().collection("sessions").add(session);
    return { sessionId: sessionRef.id };
  } catch (error) {
    console.error("Error creating session:", error);
    throw new functions.https.HttpsError("internal", "Failed to create a new session.");
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateRecommendation = functions.https.onCall(async (data: any) => {
  const sessionId = data.sessionId as string;
  if (!sessionId) {
    throw new functions.https.HttpsError("invalid-argument", "Session ID is required.");
  }

  const sessionRef = admin.firestore().collection("sessions").doc(sessionId);
  const sessionDoc = await sessionRef.get();

  if (!sessionDoc.exists) {
    throw new functions.https.HttpsError("not-found", "Session not found.");
  }

  const goal = sessionDoc.data()?.goal.toLowerCase() as string;
  if (!goal) {
    throw new functions.https.HttpsError("failed-precondition", "Session has no goal.");
  }

  let recommendation: Omit<Recommendation, "sessionId" | "generatedAt">;
  const has = (keyword: string) => goal.includes(keyword);

  if (has("optimize") || has("routing") || has("portfolio") || has("combination")) {
    recommendation = {
      problemType: "Optimization", dataReadiness: "medium", recommendedPath: "hybrid",
      alternativePath: "classical", recommendationStrength: "medium", confidence: 0.65,
      reasoningSummary: "Goal appears to be optimization, a good fit for hybrid approaches.",
      quantumFitRationale: "Quantum-inspired solvers can find novel solutions.",
      classicalFitRationale: "Classical heuristics are mature and provide a good baseline.",
      tradeoffs: "Quantum/hybrid may be slower but can find better solutions.",
      assumptions: ["Problem can be formulated as a QUBO."],
      blockers: ["Requires specialized knowledge."],
      requiredInputs: ["Objective function.", "Constraints."],
      overrideAllowed: true, explorationVsProduction: "exploration", source: "server-heuristic",
    };
  } else {
    recommendation = {
      problemType: "General / Unclassified", dataReadiness: "low", recommendedPath: "classical",
      alternativePath: "quantum", recommendationStrength: "high", confidence: 0.9,
      reasoningSummary: "Goal is too generic. A classical approach is more pragmatic.",
      quantumFitRationale: "Quantum approach not recommended without clearer problem definition.",
      classicalFitRationale: "Classical computing is well-suited for general tasks.",
      tradeoffs: "Starting with classical is lower risk.",
      assumptions: ["Goal is not a niche quantum problem."],
      blockers: ["Lack of structured problem definition."],
      requiredInputs: ["A more specific goal."],
      overrideAllowed: true, explorationVsProduction: "insufficient-information", source: "server-heuristic",
    };
  }

  try {
    const finalRec: Recommendation = { ...recommendation, sessionId, generatedAt: admin.firestore.FieldValue.serverTimestamp() };
    const recRef = await admin.firestore().collection("recommendations").add(finalRec);
    await sessionRef.update({ recommendationId: recRef.id, status: "analyzed", currentStage: "method", updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    return { recommendationId: recRef.id };
  } catch (error) {
    console.error("Error saving recommendation:", error);
    throw new functions.https.HttpsError("internal", "Failed to save recommendation.");
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const startExecution = functions.https.onCall(async (data: any) => {
  const sessionId = data.sessionId as string;
  if (!sessionId) {
    throw new functions.https.HttpsError("invalid-argument", "Session ID is required.");
  }
  const config = data.config || {};
  try {
    const execution: Execution = { sessionId, status: "queued", createdAt: admin.firestore.FieldValue.serverTimestamp(), config, results: null };
    const executionRef = await admin.firestore().collection("executions").add(execution);
    await admin.firestore().collection("sessions").doc(sessionId).update({ executionId: executionRef.id, status: "queued", currentStage: "execute", updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    return { executionId: executionRef.id };
  } catch (error) {
    console.error("Error starting execution:", error);
    throw new functions.https.HttpsError("internal", "Failed to start execution.");
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appendExecutionLog = functions.https.onCall(async (data: any) => {
  const { executionId, log } = data;
  if (!executionId || !log) {
    throw new functions.https.HttpsError("invalid-argument", "Execution ID and log message are required.");
  }
  try {
    const logEntry = { timestamp: admin.firestore.FieldValue.serverTimestamp(), message: log };
    await admin.firestore().collection("executions").doc(executionId).collection("logs").add(logEntry);
    return { success: true };
  } catch (error) {
    console.error("Error appending log:", error);
    throw new functions.https.HttpsError("internal", "Failed to append log.");
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const finalizeExecution = functions.https.onCall(async (data: any) => {
  const { executionId, finalStatus, results } = data;
  if (!executionId || !finalStatus) {
    throw new functions.https.HttpsError("invalid-argument", "Execution ID and final status are required.");
  }
  try {
    const executionRef = admin.firestore().collection("executions").doc(executionId);
    const updateData = { status: finalStatus, completedAt: admin.firestore.FieldValue.serverTimestamp(), results: results || null };
    await executionRef.update(updateData);
    const execDoc = await executionRef.get();
    const sessionId = execDoc.data()?.sessionId;
    if (sessionId) {
      await admin.firestore().collection("sessions").doc(sessionId).update({ status: finalStatus === "completed" ? "completed" : "error", currentStage: "results", updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    }
    return { success: true };
  } catch (error) {
    console.error("Error finalizing execution:", error);
    throw new functions.https.HttpsError("internal", "Failed to finalize execution.");
  }
});
