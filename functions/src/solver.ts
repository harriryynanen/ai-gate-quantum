
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

// In a real monorepo, this would be a shared type.
// For now, it's duplicated from the frontend.
export interface SolverInputContract {
    solverId: string;
    solverCategory: 'classical' | 'hybrid' | 'quantum';
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

// This function remains the same as before
export const prepareSolverInput = onCall<PrepareSolverInputRequest>(async (request) => {
  // ... (implementation is unchanged)
});

// This is the core deterministic logic.
function createSolverInputContract(sessionData: any, solverId: string): Omit<SolverInputContract, 'solverInputId' | 'createdAt'> {
    // ... (implementation is unchanged)
}

// New function to generate mock results
const generateMockResults = (executionId: string, solverInput: SolverInputContract, sessionData: any) => {
    const { solverId, solverCategory, executionMode } = solverInput;

    const baseResult = {
        sessionId: sessionData.id,
        executionId: executionId,
        solverId: solverId,
        solverCategory: solverCategory,
        executionMode: executionMode,
        resultType: 'final',
        keyMetrics: { 
            'execution_time_ms': Math.random() * 1000 + 200, 
            'cost': Math.random() * 5, 
        },
        nextActions: ['Review the detailed results.', 'Compare with other solvers.', 'Start a new analysis.'],
    };

    if (solverId === 'classical_baseline') {
        return {
            ...baseResult,
            summary: 'The classical baseline solver found a feasible solution by optimizing the primary objective.',
            interpretation: 'This result serves as a solid baseline for performance and quality. It represents a standard, well-understood approach to this type of problem. Compare other, more experimental methods against this result.',
            comparisonBaseline: {
                recommendedPath: 'Classical Baseline',
                alternativePath: 'Quantum-Inspired Annealing',
                reasoning: 'Start with a known, reliable method to establish a performance benchmark before exploring experimental approaches.',
                baselineUsed: 'This execution itself.'
            },
            transparencyNotes: {
                executionNarrative: 'The solver input was mapped to a deterministic backend function that simulated a classical optimization process.',
                guardrails: ['This is a simulated result.', 'It does not represent the performance of a production-grade classical solver.']
            },
            solverSpecificResults: {
                objectiveValue: 123.45,
                isFeasible: true,
                constraintSatisfaction: { 'constraint_1': 'satisfied', 'constraint_2': 'satisfied' },
                baselineInterpretation: 'The solver successfully navigated the constraints to find a low-cost solution.'
            }
        };
    }

    if (solverId === 'quantum_inspired_annealing') {
        return {
            ...baseResult,
            summary: 'The quantum-inspired annealer explored the solution space to find a promising low-energy configuration.',
            interpretation: 'This result suggests that the problem may have a structure amenable to heuristic optimization methods. The solution is not guaranteed to be optimal but is likely a high-quality candidate. It indicates that exploring the solution landscape with non-classical methods could be valuable.',
            comparisonBaseline: {
                recommendedPath: 'Quantum-Inspired Annealing',
                alternativePath: 'Classical Baseline',
                reasoning: 'The problem has characteristics (e.g., complexity, variable interactions) that suggest a heuristic search may be more effective than a purely classical approach.',
                baselineUsed: 'A conceptual classical solver.'
            },
            transparencyNotes: {
                executionNarrative: 'A simulated annealing process was run on a classical computer, mimicking how a quantum annealer might explore the problem's energy landscape.',
                guardrails: ['This is not a real quantum computer.', 'The result is exploratory and suggests a potential direction.', 'It does not prove quantum advantage.']
            },
            solverSpecificResults: {
                optimizationFraming: 'The problem was mapped to a QUBO model to fit the annealer's architecture.',
                searchSpaceInterpretation: 'The annealer found multiple low-energy valleys, suggesting a complex but navigable solution space.',
                annealingTradeoffs: 'The chosen annealing schedule prioritized finding a good solution quickly, potentially at the cost of finding the absolute global optimum.',
                exploratoryCaveats: ['The quality of the QUBO formulation is critical.', 'Parameter tuning can significantly impact results.']
            }
        };
    }

    if (solverId === 'qaoa_candidate') {
        return {
            ...baseResult,
            summary: 'A conceptual QAOA execution was simulated to assess the problem's suitability for this quantum algorithm.',
            interpretation: 'This result is purely educational and exploratory. It indicates that the problem can be conceptually mapped to a format suitable for QAOA. It is a starting point for further investigation into quantum algorithms, not a production-ready solution.',
            comparisonBaseline: {
                recommendedPath: 'QAOA Candidate (Exploratory)',
                alternativePath: 'Classical Baseline',
                reasoning: 'The goal is to understand the potential of quantum algorithms for this problem, even if the technology is not yet mature.',
                baselineUsed: 'A conceptual classical solver.'
            },
            transparencyNotes: {
                executionNarrative: 'The simulation involved creating a parameterized quantum circuit (ansatz) and using a classical optimizer to tune its parameters. This was all simulated on classical hardware.',
                guardrails: ['This is a simulation of a quantum algorithm on a classical computer.', 'It provides no evidence of quantum advantage.', 'The results are for educational and research purposes only.']
            },
            solverSpecificResults: {
                exploratoryStatus: 'This is a conceptual, simulated execution to demonstrate the potential structure of a QAOA approach.',
                conceptualMappingQuality: 'The problem was mapped to an Ising model, which is a standard input for QAOA. The mapping appears to be sound from a theoretical perspective.',
                limitations: ['The simulation uses a small number of qubits and a shallow circuit depth.', 'Noise and decoherence of real quantum hardware are not fully modeled.'],
                quantumAdvantageDisclaimer: 'This simulation does not demonstrate quantum advantage. It is a tool for research and for learning how a problem might be structured for a quantum computer.'
            }
        };
    }

    // Fallback for unknown solver
    return {
        ...baseResult,
        summary: `No specific mock result generator for solver '${solverId}'.`,
        interpretation: 'This is a generic result payload.',
        transparencyNotes: { guardrails: ['The backend did not have a specific mock for this solver.'], executionNarrative: 'Generic execution.' },
        solverSpecificResults: null
    };
};


interface ExecuteSolverRequest {
    sessionId: string;
    solverInputId: string;
}

export const executeSolver = onCall<ExecuteSolverRequest>(async (request) => {
    if (!request.auth) {
        throw new HttpsError("unauthenticated", "User must be authenticated.");
    }
    const { sessionId, solverInputId } = request.data;
    const { uid } = request.auth;

    // 1. Load session and solver input, verify ownership
    const sessionRef = db.collection('sessions').doc(sessionId);
    const solverInputRef = db.collection('solverInputs').doc(solverInputId);
    
    const [sessionDoc, solverInputDoc] = await Promise.all([sessionRef.get(), solverInputRef.get()]);

    if (!sessionDoc.exists || sessionDoc.data()?.userId !== uid) {
      throw new HttpsError("not-found", "Session not found or permission denied.");
    }
    if (!solverInputDoc.exists || solverInputDoc.data()?.sessionId !== sessionId) {
        throw new HttpsError("not-found", "Solver input not found or does not belong to this session.");
    }

    const sessionData = { id: sessionDoc.id, ...sessionDoc.data() };
    const solverInputData = solverInputDoc.data() as SolverInputContract;

    // 2. Create an execution record
    const executionRef = await db.collection('executions').add({
        sessionId,
        solverInputId,
        status: 'running',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // 3. Generate the mock results based on the solver input
    const mockResults = generateMockResults(executionRef.id, solverInputData, sessionData);

    // 4. Update the execution record with the final results
    await executionRef.update({
        status: 'completed',
        finishedAt: admin.firestore.FieldValue.serverTimestamp(),
        results: mockResults, // Embed the full results payload
    });

    // 5. Update the session to link to the latest execution
    await sessionRef.update({
        latestExecutionId: executionRef.id,
        status: 'completed',
        currentStage: 'results',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, executionId: executionRef.id };
});
