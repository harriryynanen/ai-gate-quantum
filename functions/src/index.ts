
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
  currentStage: "goal" | "formulation" | "method" | "data" | "config" | "execute" | "results";
  createdAt: admin.firestore.FieldValue;
  updatedAt: admin.firestore.FieldValue;
  recommendationId?: string;
  executionId?: string;
  formulation?: ProblemFormulation;
  dataReadiness?: DataReadiness;
}

// Added interfaces directly here for now. In a larger project, this would be a shared package.
export interface ProblemFormulation {
  problemStatement: string;
  goalType: 'Optimization' | 'Simulation' | 'Modeling' | 'Unknown';
  domainContext: string;
  decisionVariables: string[];
  constraints: string[];
  objectiveFunction: string;
  candidateProblemClass: string; // e.g., 'Optimization.TSP', 'Simulation.QuantumChemistry'
  dataInputsNeeded: string[];
  providedInputs: string[];
  missingInputs: string[];
  dataReadiness: number; // A score from 0.0 to 1.0
  formulationConfidence: number; // A score from 0.0 to 1.0
  formulationWarnings: string[];
  quantumRelevance: 'High' | 'Medium' | 'Low' | 'None';
  classicalBaselineNeed: 'High' | 'Medium' | 'Low';
  notesForUser: string;
}

export interface DataReadiness {
  structuralCompleteness: number; // Score 0.0-1.0
  variableDefinitionQuality: number; // Score 0.0-1.0
  constraintDefinitionQuality: number; // Score 0.0-1.0
  objectiveClarity: number; // Score 0.0-1.0
  solverInputReadiness: number; // Score 0.0-1.0
  missingCriticalFields: string[];
  normalizationNeeded: boolean;
  transformationNeeded: boolean;
  readinessSummary: string;
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

  // New quantum suitability assessment fields
  optimizationStructureFit: "high" | "medium" | "low";
  combinatorialComplexity: "high" | "medium" | "low";
  quboMappingFeasibility: "high" | "medium" | "low";
  dataPreparationReadiness: "high" | "medium" | "low";
  interpretabilityNeed: "high" | "medium" | "low";
  runtimeMaturityFit: "high" | "medium" | "low";
  quantumSuitability: "high" | "medium" | "low" | "none";
  classicalBaselineNecessity: "high" | "medium" | "low";
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

interface FormulateProblemRequest {
  sessionId: string;
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

export const formulateProblem = onCall<FormulateProblemRequest>(async (request) => {
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

  // Simple deterministic, rule-based formulation based on keywords
  const has = (keyword: string) => goal.includes(keyword);

  let formulation: ProblemFormulation;
  let readiness: DataReadiness;

  // Default state
  let goalType: ProblemFormulation['goalType'] = 'Unknown';
  let candidateProblemClass = 'General';
  let quantumRelevance: ProblemFormulation['quantumRelevance'] = 'None';
  let classicalBaselineNeed: ProblemFormulation['classicalBaselineNeed'] = 'High';
  let formulationConfidence = 0.3;
  let notesForUser = "The initial problem statement is too vague for a detailed formulation. Please provide more specific details about your objectives, variables, and constraints.";
  
  if (has('optimize') || has('minimize') || has('maximize')) {
    goalType = 'Optimization';
    formulationConfidence = 0.6;
    notesForUser = "The system has identified an optimization problem. To proceed, please define the objective function you wish to optimize and the constraints that apply.";
    if (has('route') || has('path') || has('tsp')) {
      candidateProblemClass = 'Optimization.Routing';
      quantumRelevance = 'Medium';
    } else if (has('portfolio') || has('assets')) {
      candidateProblemClass = 'Optimization.Finance';
      quantumRelevance = 'Medium';
    }
  } else if (has('simulate') || has('model')) {
    goalType = 'Simulation';
    formulationConfidence = 0.5;
    notesForUser = "A simulation problem has been identified. Please specify the system you want to model and the properties you are interested in.";
    if (has('quantum') || has('molecule')) {
      candidateProblemClass = 'Simulation.QuantumSystem';
      quantumRelevance = 'High';
    }
  }
  
  formulation = {
    problemStatement: sessionDoc.data()?.goal,
    goalType,
    domainContext: "Extracted from user goal",
    decisionVariables: [],
    constraints: [],
    objectiveFunction: "",
    candidateProblemClass,
    dataInputsNeeded: ["Structured data file (e.g., CSV, JSON)"],
    providedInputs: [],
    missingInputs: ["Structured data file"],
    dataReadiness: 0.1,
    formulationConfidence,
    formulationWarnings: ["Formulation is based on a brief goal statement and is likely incomplete."],
    quantumRelevance,
    classicalBaselineNeed,
    notesForUser,
  };

  readiness = {
    structuralCompleteness: 0.2,
    variableDefinitionQuality: 0.1,
    constraintDefinitionQuality: 0.1,
    objectiveClarity: 0.1,
    solverInputReadiness: 0.0,
    missingCriticalFields: ["Decision Variables", "Constraints", "Objective Function"],
    normalizationNeeded: true,
    transformationNeeded: true,
    readinessSummary: "The problem is not ready for any solver. Critical information is missing.",
  };

  try {
    await sessionRef.update({
      formulation,
      dataReadiness: readiness,
      status: "analyzing",
      currentStage: "formulation", 
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { formulation, dataReadiness: readiness };
  } catch (error) {
    console.error("Error saving formulation:", error);
    throw new HttpsError("internal", "Failed to save problem formulation.");
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

  const sessionData = sessionDoc.data() as Session;
  const goal = (sessionData.goal || "").toLowerCase();
  const formulation = sessionData.formulation;

  if (!goal) {
    throw new HttpsError("failed-precondition", "Session has no goal.");
  }

  let rec: Omit<Recommendation, "sessionId" | "generatedAt">;

  // --- Updated recommendation logic using formulation ---
  if (formulation && formulation.formulationConfidence > 0.5) {
    const isOptimization = formulation.goalType === 'Optimization';
    const quantumSuitable = formulation.quantumRelevance === 'Medium' || formulation.quantumRelevance === 'High';

    rec = {
      problemType: formulation.candidateProblemClass,
      dataReadiness: formulation.dataReadiness < 0.5 ? "low" : "medium",
      recommendedPath: quantumSuitable ? "hybrid" : "classical",
      alternativePath: quantumSuitable ? "classical" : "hybrid",
      recommendationStrength: formulation.formulationConfidence < 0.7 ? "low" : "medium",
      confidence: formulation.formulationConfidence,
      reasoningSummary: `Based on the structured formulation, this appears to be a ${formulation.candidateProblemClass} problem. The current data readiness is low, so the recommendation is tentative.`, 
      quantumFitRationale: quantumSuitable ? "The problem structure suggests potential for a quantum or quantum-inspired approach." : "The problem does not currently have characteristics suitable for a quantum approach.",
      classicalFitRationale: "A classical baseline is always recommended to benchmark performance.",
      tradeoffs: "Quantum approaches may offer better solutions for specific problems but come with higher complexity and less mature tooling.",
      assumptions: ["The formulation accurately reflects the user\'s intent."],
      blockers: formulation.missingInputs,
      requiredInputs: formulation.dataInputsNeeded,
      overrideAllowed: true,
      explorationVsProduction: "exploration",
      source: "deterministic-server-heuristic",
      mappedSolverId: quantumSuitable ? "quantum_inspired_annealing" : "classical_baseline",
      mappedSolverCategory: quantumSuitable ? "hybrid" : "classical",
      mappingConfidence: 0.7,
      mappingReason: "Mapping based on the detected problem class.",
      optimizationStructureFit: isOptimization ? "high" : "low",
      combinatorialComplexity: "low", // Placeholder
      quboMappingFeasibility: "low", // Placeholder
      dataPreparationReadiness: "low", // Placeholder
      interpretabilityNeed: "medium",
      runtimeMaturityFit: "high",
      quantumSuitability: formulation.quantumRelevance === 'High' ? 'high' : formulation.quantumRelevance === 'Medium' ? 'medium' : 'low',
      classicalBaselineNecessity: "high",
    };

  } else {
    // Fallback to original goal-based logic if formulation is weak
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
      optimizationStructureFit: "low",
      combinatorialComplexity: "low",
      quboMappingFeasibility: "low",
      dataPreparationReadiness: "low",
      interpretabilityNeed: "high",
      runtimeMaturityFit: "high",
      quantumSuitability: "none",
      classicalBaselineNecessity: "high",
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
    return { recommendationId: recommendationRef.id, ...recommendation };
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
