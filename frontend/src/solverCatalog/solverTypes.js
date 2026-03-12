
/**
 * @typedef {"classical" | "hybrid" | "quantum"} SolverCategory
 */

/**
 * @typedef {"concept" | "prototype" | "runnable" | "production-ready"} SolverMaturity
 */

/**
 * @typedef {"active-backend" | "reference-only" | "exploratory-placeholder"} RuntimeStatus
 */

/**
 * @typedef {object} Solver
 * @property {string} id
 * @property {string} name
 * @property {SolverCategory} category
 * @property {SolverMaturity} maturity
 * @property {string} description
 * @property {string[]} suitableProblemTypes
 * @property {object} requiredInputs
 * @property {string[]} strengths
 * @property {string[]} weaknesses
 * @property {string} interpretability
 * @property {string} executionNotes
 * @property {string} uiLabel
 * @property {string[]} recommendedWhen
 * @property {string[]} notRecommendedWhen
 * @property {boolean} enabled
 * @property {RuntimeStatus} runtimeStatus
 * @property {string} referenceCodePath
 * @property {string} activeExecutionPath
 */

export {};
