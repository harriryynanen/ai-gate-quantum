import React from 'react';
import '../Results.css';

const ClassicalResultBody = ({ result }) => {
  if (!result || !result.solverSpecificResults) return null;

  const { cost, solutionQuality } = result.solverSpecificResults;

  return (
    <div className="solver-output">
      <h3>Classical Baseline Output</h3>
      <div className="metrics-grid">
        <div className="metric-item">
          <span className="metric-label">Final Cost</span>
          <span className="metric-value">{cost}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Solution Quality</span>
          <span className="metric-value">{solutionQuality}</span>
        </div>
      </div>
    </div>
  );
};

export default ClassicalResultBody;
