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

export interface ExecutionMetadata {
  executionMode: 'deterministic-backend' | 'reference-only' | 'exploratory-simulated';
  solverInputId: string;
  runtimeNarrative: string;
  outputInterpretationScope: string;
}
