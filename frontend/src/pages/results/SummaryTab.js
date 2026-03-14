import React from 'react';
import './Results.css';

const SummaryTab = ({ result }) => {
  if (!result) return null;

  return (
    <div className="tab-content">
      <h2>Execution Summary</h2>
      <p>{result.summary}</p>

      <h3>Interpretation</h3>
      <p>{result.interpretation}</p>

      {result.comparisonBaseline && (
        <div className="baseline-info">
          <h4>Comparison Baseline</h4>
          <p><strong>Recommended Starting Point:</strong> {result.comparisonBaseline.recommendedPath}</p>
          <p><strong>Alternative Path:</strong> {result.comparisonBaseline.alternativePath}</p>
          <p><strong>Reasoning:</strong> {result.comparisonBaseline.reasoning}</p>
          <p><strong>Baseline Used Here:</strong> {result.comparisonBaseline.baselineUsed}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryTab;
