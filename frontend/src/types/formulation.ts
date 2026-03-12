
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

