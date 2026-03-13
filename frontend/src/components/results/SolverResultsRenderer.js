
import React from 'react';
import ClassicalBaselineResultsView from './solver-views/ClassicalBaselineResultsView';
import QuantumInspiredAnnealingResultsView from './solver-views/QuantumInspiredAnnealingResultsView';
import QAOACandidateResultsView from './solver-views/QAOACandidateResultsView';
import GenericTransparencyView from './solver-views/GenericTransparencyView';

const solverComponentMap = {
  classical_baseline: ClassicalBaselineResultsView,
  quantum_inspired_annealing: QuantumInspiredAnnealingResultsView,
  qaoa_candidate: QAOACandidateResultsView,
};

const SolverResultsRenderer = ({ execution }) => {
  if (!execution || !execution.solverId) {
    return <GenericTransparencyView execution={execution} />;
  }

  const SolverComponent = solverComponentMap[execution.solverId];

  if (!SolverComponent) {
    return <GenericTransparencyView execution={execution} />;
  }

  // The result payload is now expected to be nested under the execution object.
  // This structure needs to be confirmed with the backend implementation.
  const results = execution.results; 

  return <SolverComponent results={results?.solverSpecificResults} execution={execution} />;
};

export default SolverResultsRenderer;
