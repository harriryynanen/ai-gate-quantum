
import { solvers } from './solverDefinitions.js';

/**
 * @typedef {'classical' | 'hybrid' | 'quantum'} RecommendationPath
 */

/**
 * @param {RecommendationPath} path
 * @returns {import('./solverTypes').Solver | undefined}
 */
export const getSolverForRecommendation = (path) => {
  switch (path) {
    case 'classical':
      return solvers.find(s => s.id === 'classical_baseline' && s.enabled);
    case 'hybrid':
      return solvers.find(s => s.id === 'quantum_inspired_annealing' && s.enabled);
    case 'quantum':
      // Only recommend QAOA if it's explicitly enabled and considered for exploratory work.
      return solvers.find(s => s.id === 'qaoa_candidate' && s.enabled && s.maturity !== 'production-ready');
    default:
      return undefined;
  }
};
