
/**
 * @typedef {'classical_baseline' | 'quantum_inspired_annealing' | 'qaoa_candidate'} SolverId
 */

/**
 * @typedef {'classical' | 'hybrid' | 'quantum'} SolverCategory
 */

/**
 * @typedef {'deterministic-backend' | 'reference-only' | 'exploratory-simulated'} ExecutionMode
 */

/**
 * @typedef {'final' | 'interim' | 'error'} ResultType
 */

/**
 * @typedef {object} ClassicalBaselineResults
 * @property {number} objectiveValue
 * @property {boolean} isFeasible
 * @property {object} constraintSatisfaction
 * @property {string} baselineInterpretation
 */

/**
 * @typedef {object} QuantumInspiredAnnealingResults
 * @property {string} optimizationFraming - How the problem was framed for the annealer.
 * @property {string} searchSpaceInterpretation - Interpretation of the search space exploration.
 * @property {string} annealingTradeoffs - Discussion of tradeoffs (e.g., speed vs. quality).
 * @property {string[]} exploratoryCaveats
 */

/**
 * @typedef {object} QAOACandidateResults
 * @property {string} exploratoryStatus - Confirms this is an exploratory, not definitive, result.
 * @property {string} conceptualMappingQuality - How well the problem mapped to the QAOA structure.
 * @property {string[]} limitations
 * @property {string} quantumAdvantageDisclaimer - Explicitly states this is not evidence of quantum advantage.
 */

/**
 * @typedef {object} ResultPayload
 * @property {string} sessionId
 * @property {string} executionId
 * @property {SolverId} solverId
 * @property {SolverCategory} solverCategory
 * @property {ExecutionMode} executionMode
 * @property {ResultType} resultType
 * @property {string} summary
 * @property {Record<string, string | number>} keyMetrics
 * @property {string} interpretation
 * @property {string[]} caveats
 * @property {object} comparisonBaseline
 * @property {string} comparisonBaseline.recommendedPath - The path that was taken.
 * @property {string} comparisonBaseline.alternativePath - The alternative path that was not taken.
 * @property {string} comparisonBaseline.reasoning - Why the recommended path was chosen.
 * @property {string} comparisonBaseline.baselineUsed - What baseline is being used for comparison.
 * @property {string[]} nextActions - Suggested next steps for the user.
 * @property {object} transparencyNotes
 * @property {string} transparencyNotes.executionNarrative - How the execution relates to the input contract.
 * @property {string[]} transparencyNotes.guardrails - Explicit interpretation guardrails.
 * @property {ClassicalBaselineResults | QuantumInspiredAnnealingResults | QAOACandidateResults | null} solverSpecificResults
 */

export const resultModel = {}; // Empty export to make this a module
