
import React, { Suspense, lazy } from 'react';

const GenericResultsView = lazy(() => import('./renderers/GenericResultsView'));
const ClassicalBaselineResultsView = lazy(() => import('./renderers/ClassicalBaselineResultsView'));
const QuantumInspiredAnnealingResultsView = lazy(() => import('./renderers/QuantumInspiredAnnealingResultsView'));
const QAOACandidateResultsView = lazy(() => import('./renderers/QAOACandidateResultsView'));

const solverMap = {
  'classical-baseline': ClassicalBaselineResultsView,
  'quantum-inspired-annealing': QuantumInspiredAnnealingResultsView,
  'qaoa-candidate-search': QAOACandidateResultsView,
};

const LoadingFallback = () => (
    <div className="bg-white shadow-lg rounded-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-20 bg-gray-200 rounded-lg"></div>
            <div className="h-20 bg-gray-200 rounded-lg"></div>
            <div className="h-20 bg-gray-200 rounded-lg"></div>
            <div className="h-20 bg-gray-200 rounded-lg"></div>
        </div>
    </div>
);

const SolverResultsRenderer = ({ execution }) => {
    if (!execution || !execution.resultsSummary) {
        return <LoadingFallback />;
    }

    const solverId = execution.config?.solverId;
    const ResultsComponent = solverMap[solverId] || GenericResultsView;

    return (
        <Suspense fallback={<LoadingFallback />}>
            <ResultsComponent results={execution.resultsSummary} />
        </Suspense>
    );
};

export default SolverResultsRenderer;
