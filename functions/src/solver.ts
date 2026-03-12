import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

// In a real monorepo, this would be a shared type.
// For now, it's duplicated from the frontend.
export interface SolverInputContract {
    solverId: string;
    solverCategory: 'classical_baseline' | 'quantum_inspired_annealing' | 'qaoa_candidate';
    inputRepresentation: 'qubo' | 'ising' | 'classical_optimization_model' | 'other';
    inputSummary: string;
    objectiveEncoding: string;
    constraintEncoding: string;
    variableEncoding: string;
    requiredFields: string[];
    providedFields: string[];
    missingFields: string[];
    transformSteps: string[];
    readinessStatus: 'ready' | 'needs_attention' | 'not_ready';
    readinessWarnings: string[];
    executionMode: 'deterministic-backend' | 'reference-only' | 'exploratory-simulated';
    explanationForUser: string;
}

// Ensure admin is initialized
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();

interface PrepareSolverInputRequest {
    sessionId: string;
}

export const prepareSolverInput = onCall<PrepareSolverInputRequest>(async (request) => {
  // 1. Authentication and validation
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be authenticated.");
  }
  const { sessionId } = request.data;
  const { uid } = request.auth;

  if (!sessionId) {
    throw new HttpsError("invalid-argument", "Session ID is required.");
  }

  try {
    // 2. Load session and verify ownership
    const sessionRef = db.collection('sessions').doc(sessionId);
    const sessionDoc = await sessionRef.get();
    
    if (!sessionDoc.exists || sessionDoc.data()?.userId !== uid) {
      throw new HttpsError("not-found", "Session not found or permission denied.");
    }
    const sessionData = sessionDoc.data();

    // 3. Get mapped solver from recommendation
    const recommendationId = sessionData?.recommendationId;
    if (!recommendationId) {
        throw new HttpsError("failed-precondition", "No recommendation found for this session.");
    }

    const recommendationDoc = await db.collection('recommendations').doc(recommendationId).get();
    if (!recommendationDoc.exists) {
        throw new HttpsError("failed-precondition", "Recommendation details not found.");
    }

    const mappedSolverId = recommendationDoc.data()?.mappedSolverId;
    if (!mappedSolverId) {
        throw new HttpsError("failed-precondition", "No mapped solver found in the recommendation.");
    }

    // 4. Deterministically create the solver input contract
    const solverInputContract = createSolverInputContract(sessionData, mappedSolverId);

    // 5. Store the new contract
    const solverInputRef = await db.collection('solverInputs').add({
        ...solverInputContract,
        sessionId, // Add session link
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // 6. Link it back to the session
    await sessionRef.update({
      solverInputId: solverInputRef.id,
      status: 'input_prepared', // Update session status
      currentStage: 'config',
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { success: true, solverInputId: solverInputRef.id };

  } catch (error) {
    console.error("Error preparing solver input:", error);
    if (error instanceof HttpsError) {
      throw error;
    }
    throw new HttpsError("internal", "An unexpected error occurred while preparing the solver input.");
  }
});

// This is the core deterministic logic.
function createSolverInputContract(sessionData: any, solverId: string): Omit<SolverInputContract, 'solverInputId' | 'createdAt'> {
  const { formulation, dataReadiness } = sessionData;

  // Defaults
  let contract: SolverInputContract = {
      solverId: solverId,
      solverCategory: 'classical_baseline',
      inputRepresentation: 'other',
      inputSummary: `This is a standard input contract for the '${solverId}' solver.`,
      objectiveEncoding: 'Not specified.',
      constraintEncoding: 'Not specified.',
      variableEncoding: 'Not specified.',
      requiredFields: formulation?.dataInputsNeeded || ['Problem data'],
      providedFields: formulation?.providedInputs || [],
      missingFields: formulation?.missingInputs || ['Problem data'],
      transformSteps: ['Load problem formulation data.'],
      readinessStatus: 'not_ready',
      readinessWarnings: ['Solver input preparation logic has not been fully implemented for this solver.'],
      executionMode: 'reference-only',
      explanationForUser: 'The system has mapped your problem to a conceptual solver. The next step is to prepare the data and configuration for execution, which is currently a reference-only simulation.',
  };

  // --- Solver-specific logic ---

  if (solverId === 'classical_baseline') {
    contract.solverCategory = 'classical_baseline';
    contract.inputRepresentation = 'classical_optimization_model';
    contract.explanationForUser = 'The problem is being prepared for a standard classical solver. This will serve as a baseline to compare against other methods. The execution will be a deterministic simulation on the backend.';
    contract.executionMode = 'deterministic-backend';
    
    if (dataReadiness?.solverInputReadiness > 0.5) {
        contract.readinessStatus = 'ready';
        contract.readinessWarnings = ['Ready for simulated classical execution.'];
        contract.transformSteps.push('Map formulation fields to classical solver parameters.');
    } else {
        contract.readinessStatus = 'needs_attention';
        contract.readinessWarnings = ['Data readiness is low. The classical solver may not produce meaningful results.'];
    }
  } 
  else if (solverId === 'quantum_inspired_annealing') {
    contract.solverCategory = 'quantum_inspired_annealing';
    contract.inputRepresentation = 'qubo';
    contract.explanationForUser = 'To use a quantum-inspired annealer, the problem must be converted into a Quadratic Unconstrained Binary Optimization (QUBO) model. This involves encoding your objective and constraints into a specific mathematical form.';
    contract.executionMode = 'exploratory-simulated';
    contract.transformSteps = [
        'Identify objective function from formulation.',
        'Identify constraints from formulation.',
        'Attempt to map variables to binary variables.',
        'Formulate QUBO matrix (Conceptual).',
    ];

    // Check if problem is suitable for QUBO
    if (formulation?.goalType === 'Optimization' && formulation.quantumRelevance !== 'None') {
        contract.readinessStatus = 'needs_attention';
        contract.readinessWarnings = ['Problem seems suitable for QUBO, but automatic mapping is a complex task and requires careful data preparation.'];
    } else {
        contract.readinessStatus = 'not_ready';
        contract.readinessWarnings = ['The problem, as formulated, is not a good fit for a QUBO-based solver. This path is not recommended.'];
    }
  }
  else if (solverId === 'qaoa_candidate') {
    contract.solverCategory = 'qaoa_candidate';
    contract.inputRepresentation = 'ising';
    contract.explanationForUser = 'The QAOA algorithm is a hybrid quantum-classical algorithm for optimization problems. It requires mapping the problem to an Ising model, which is closely related to the QUBO form. This is an exploratory path.';
    contract.executionMode = 'exploratory-simulated';
    contract.transformSteps = [
        'Check if problem can be formulated as a QUBO or Ising model.',
        'Define the structure of the QAOA ansatz.',
        'Set up classical optimization loop (Conceptual).',
    ];
    contract.readinessStatus = 'not_ready';
    contract.readinessWarnings = ['QAOA is highly experimental. The mapping and execution are for conceptual and educational purposes only. It does not represent real quantum execution.'];
  }

  // Common readiness checks
  if (dataReadiness?.missingCriticalFields?.length > 0) {
      contract.missingFields = dataReadiness.missingCriticalFields;
      contract.readinessStatus = 'not_ready';
      contract.readinessWarnings.push(`Critical fields are missing: ${dataReadiness.missingCriticalFields.join(', ')}`);
  }

  return contract;
}
