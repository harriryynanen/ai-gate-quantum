
import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";

// Initialize Firebase Admin SDK
admin.initializeApp();

// --- Firestore Document Interfaces ---

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
  source: "deterministic-server-heuristic";
  mappedSolverId?: string;
  mappedSolverCategory?: "classical" | "hybrid" | "quantum";
  mappingConfidence?: number;
  mappingReason?: string;
}

interface Execution {
  sessionId: string;
  status: "queued" | "running" | "completed" | "failed";
  createdAt: admin.firestore.FieldValue;
  startedAt?: admin.firestore.FieldValue;
  completedAt?: admin.firestore.FieldValue;
  config: Record<string, unknown>;
  results: Record<string, unknown> | null;
}

// --- Callable Function Request Interfaces ---

interface CreateSessionRequest {
  goal: string;
}

interface GenerateRecommendationRequest {
  sessionId: string;
}

interface StartExecutionRequest {
  sessionId: string;
  config: Record<string, unknown>;
}

interface AppendExecutionLogRequest {
  executionId: string;
  log: string;
}

interface FinalizeExecutionRequest {
  executionId: string;
  finalStatus: "completed" | "failed";
  results: Record<string, unknown>;
}

// --- Callable Functions (v2) ---

export const createSessionFromGoal = onCall<CreateSessionRequest>(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "The function must be called while authenticated.");
  }
  const { goal } = request.data;
  const { uid } = request.auth;

  if (!goal || typeof goal !== "string" || goal.trim().length === 0) {
    throw new HttpsError("invalid-argument", "The function must be called with a non-empty \"goal\" string.");
  }

  try {
    const newSession: Session = {
      userId: uid,
      title: `New Session: ${goal.substring(0, 30)}...`,
      goal,
      status: "new",
      currentStage: "goal",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const sessionRef = await admin.firestore().collection("sessions").add(newSession);
    return { sessionId: sessionRef.id };
  } catch (error) {
    console.error("Error creating session:", error);
    throw new HttpsError("internal", "Failed to create a new session.");
  }
});

export const generateRecommendation = onCall<GenerateRecommendationRequest>(async (request) => {
  const { sessionId } = request.data;
  if (!sessionId) {
    throw new HttpsError("invalid-argument", "Session ID is required.");
  }

  const sessionRef = admin.firestore().collection("sessions").doc(sessionId);
  const sessionDoc = await sessionRef.get();

  if (!sessionDoc.exists) {
    throw new HttpsError("not-found", "Session not found.");
  }

  const goal = (sessionDoc.data()?.goal || "").toLowerCase();
  if (!goal) {
    throw new HttpsError("failed-precondition", "Session has no goal.");
  }

  let rec: Omit<Recommendation, "sessionId" | "generatedAt">;
  const has = (keyword: string) => goal.includes(keyword);

  if (has("optimize") || has("routing") || has("portfolio") || has("combination")) {
    rec = {
      problemType: "Optimization",
      dataReadiness: "medium",
      recommendedPath: "hybrid",
      alternativePath: "classical",
      recommendationStrength: "medium",
      confidence: 0.7,
      reasoningSummary: "The user's goal mentions keywords related to optimization, a strong candidate for hybrid quantum-classical approaches.",
      quantumFitRationale: "Quantum-inspired or hybrid solvers can excel at exploring vast solution spaces in combinatorial optimization problems.",
      classicalFitRationale: "Classical heuristics are mature, fast, and effective for many optimization problems, serving as a vital baseline or component.",
      tradeoffs: "A hybrid approach may discover better solutions but could have a longer runtime compared to purely classical methods.",
      assumptions: ["The problem can be modeled in a compatible format (e.g., QUBO)."],
      blockers: ["Mapping the problem to a quantum-compatible format requires domain expertise."],
      requiredInputs: ["A clear objective function to be minimized or maximized.", "A well-defined set of constraints."],
      overrideAllowed: true,
      explorationVsProduction: "exploration",
      source: "deterministic-server-heuristic",
      mappedSolverId: "quantum_inspired_annealing",
      mappedSolverCategory: "hybrid",
      mappingConfidence: 0.9,
      mappingReason: "The user's goal points to optimization, mapping to the primary hybrid solver.",
    };
  } else {
    rec = {
      problemType: "General / Unclassified",
      dataReadiness: "low",
      recommendedPath: "classical",
      alternativePath: "quantum",
      recommendationStrength: "high",
      confidence: 0.95,
      reasoningSummary: "The user's goal is too generic to map to a quantum advantage. A classical path is a more pragmatic start.",
      quantumFitRationale: "A quantum approach is not recommended without a clearer, structured problem definition that aligns with known quantum algorithms.",
      classicalFitRationale: "Classical computing is well-suited for a vast range of tasks and provides the necessary tools for initial data analysis, modeling, and execution.",
      tradeoffs: "Starting with a classical path is lower risk and allows for building a baseline. A quantum path is high-risk/high-reward and requires significant justification.",
      assumptions: ["The goal is not a niche quantum problem in disguise."],
      blockers: ["The lack of a structured problem definition is a primary blocker for any advanced computational approach."],
      requiredInputs: ["A more specific, measurable goal.", "Structured data relevant to the problem."],
      overrideAllowed: true,
      explorationVsProduction: "insufficient-information",
      source: "deterministic-server-heuristic",
      mappedSolverId: "classical_baseline",
      mappedSolverCategory: "classical",
      mappingConfidence: 0.95,
      mappingReason: "The user's goal is general, mapping to the reliable classical baseline.",
    };
  }

  try {
    const recommendation: Recommendation = {
      ...rec,
      sessionId,
      generatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const recommendationRef = await admin.firestore().collection("recommendations").add(recommendation);
    await sessionRef.update({
      recommendationId: recommendationRef.id,
      status: "analyzed",
      currentStage: "method",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { recommendationId: recommendationRef.id };
  } catch (error) {
    console.error("Error saving recommendation:", error);
    throw new HttpsError("internal", "Failed to save recommendation.");
  }
});

export const startExecution = onCall<StartExecutionRequest>(async (request) => {
  const { sessionId, config } = request.data;
  if (!sessionId) {
    throw new HttpsError("invalid-argument", "Session ID is required.");
  }

  try {
    const newExecution: Execution = {
      sessionId,
      status: "queued",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      config: config || {},
      results: null,
    };
    const executionRef = await admin.firestore().collection("executions").add(newExecution);
    await admin.firestore().collection("sessions").doc(sessionId).update({
      executionId: executionRef.id,
      status: "queued",
      currentStage: "execute",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { executionId: executionRef.id };
  } catch (error) {
    console.error("Error starting execution:", error);
    throw new HttpsError("internal", "Failed to start execution.");
  }
});

export const appendExecutionLog = onCall<AppendExecutionLogRequest>(async (request) => {
  const { executionId, log } = request.data;
  if (!executionId || !log) {
    throw new HttpsError("invalid-argument", "Execution ID and log message are required.");
  }
  try {
    const logEntry = { timestamp: admin.firestore.FieldValue.serverTimestamp(), message: log };
    await admin.firestore().collection("executions").doc(executionId).collection("logs").add(logEntry);
    return { success: true };
  } catch (error) {
    console.error("Error appending log:", error);
    throw new HttpsError("internal", "Failed to append log.");
  }
});

export const finalizeExecution = onCall<FinalizeExecutionRequest>(async (request) => {
  const { executionId, finalStatus, results } = request.data;
  if (!executionId || !finalStatus) {
    throw new HttpsError("invalid-argument", "Execution ID and final status are required.");
  }
  try {
    const executionRef = admin.firestore().collection("executions").doc(executionId);
    await executionRef.update({
      status: finalStatus,
      completedAt: admin.firestore.FieldValue.serverTimestamp(),
      results: results || null,
    });

    const execDoc = await executionRef.get();
    const sessionId = execDoc.data()?.sessionId;

    if (sessionId) {
      await admin.firestore().collection("sessions").doc(sessionId).update({
        status: finalStatus === "completed" ? "completed" : "error",
        currentStage: "results",
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Error finalizing execution:", error);
    throw new HttpsError("internal", "Failed to finalize execution.");
  }
});
