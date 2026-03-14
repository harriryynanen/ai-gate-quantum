
/**
 * @typedef {'classical_baseline' | 'linear_regression' | 'quantum_inspired_annealing' | 'vqe_prototype' | 'grover_search' | 'qaoa_candidate'} SolverId
 */

/**
 * @typedef {'classical' | 'hybrid' | 'quantum'} SolverCategory
 */

/**
 * @typedef {'production-ready' | 'runnable' | 'prototype' | 'simulator'} Maturity
 */

// --- Classical Results ---
/**
 * @typedef {object} ClassicalBaselineResults
 * @property {number} objectiveValue
 * @property {object} solution - The optimal variable assignments.
 * @property {string} summary - A human-readable summary of the findings.
 */

/**
 * @typedef {object} LinearRegressionResults
 * @property {number[]} coefficients
 * @property {number} intercept
 * @property {number} r_squared
 * @property {string} summary - Interpretation of the model fit.
 */

// --- Hybrid Results ---
/**
 * @typedef {object} QuantumInspiredAnnealingResults
 * @property {string} optimizationFraming - How the problem was framed for the annealer.
 * @property {string} searchSpaceInterpretation - Interpretation of the search space exploration.
 * @property {string[]} exploratoryCaveats
 */

/**
 * @typedef {object} VqePrototypeResults
 * @property {number} optimal_value
 * @property {number[]} optimal_parameters
 * @property {string} summary
 * @property {boolean} is_placeholder
 */

// --- Quantum Results ---
/**
 * @typedef {object} QaoaCandidateResults
 * @property {string} conceptualMappingQuality
 * @property {string} exploratoryStatus
 */

/**
 * @typedef {object} GroverSearchResults
 * @property {number} found_element
 * @property {object} measurements - The raw measurement counts from the simulator.
 * @property {string} summary
 * @property {string} executed_on
 */
