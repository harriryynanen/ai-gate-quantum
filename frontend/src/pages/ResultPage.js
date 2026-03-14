import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ResultHeader from './results/ResultHeader';
import ResultTabs from './results/ResultTabs';
import SummaryTab from './results/SummaryTab';
import TransparencyTab from './results/TransparencyTab';
import ClassicalResultBody from './results/solver-specific/ClassicalResultBody';
import QuantumResultBody from './results/solver-specific/QuantumResultBody';
import { classicalResult, quantumResult } from './results/mockResults';
import './results/Results.css';

const ResultPage = () => {
  const [activeTab, setActiveTab] = useState('Summary');
  const [searchParams] = useSearchParams();

  // Determine which result to display based on a URL parameter
  // Defaults to classical. Try `?solver=quantum` in the URL.
  const result = useMemo(() => {
    const solverType = searchParams.get('solver');
    return solverType === 'quantum' ? quantumResult : classicalResult;
  }, [searchParams]);

  const renderSolverOutput = () => {
    switch (result.solverType) {
      case 'Classical':
        return <ClassicalResultBody result={result} />;
      case 'Quantum':
        return <QuantumResultBody result={result} />;
      default:
        return <p>This solver type does not have a specific output view.</p>;
    }
  };

  return (
    <div className="results-page">
      <ResultHeader result={result} />
      <ResultTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="results-body">
        {activeTab === 'Summary' && <SummaryTab result={result} />}
        {activeTab === 'Solver Output' && renderSolverOutput()}
        {activeTab === 'Transparency Report' && <TransparencyTab result={result} />}
      </div>
    </div>
  );
};

export default ResultPage;
