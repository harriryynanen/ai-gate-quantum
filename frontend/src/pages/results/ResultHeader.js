import React from 'react';
import './Results.css';

const ResultHeader = ({ result }) => {
  if (!result) return null;

  return (
    <div className="result-header">
      <h1>Run Result: {result.id}</h1>
      <div className="header-meta">
        <span><strong>Solver:</strong> {result.uiLabel}</span>
        <span><strong>Type:</strong> {result.solverType}</span>
        <span><strong>Completed:</strong> {new Date(result.timestamp).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ResultHeader;
