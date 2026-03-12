
import React from 'react';
import './DataReadinessCard.css';

const DataReadinessCard = ({ readiness }) => {
  if (!readiness) return <p>No data readiness assessment available.</p>;

  const scoreToPercentage = (score) => `${Math.round(score * 100)}%`;

  return (
    <div className="card data-readiness-card">
      <h3>Data Readiness Assessment</h3>
      <div className="card-content">
        <p className="summary"><strong>Summary:</strong> {readiness.readinessSummary}</p>
        
        <div className="readiness-grid">
          <div className="grid-item"><strong>Structural Completeness:</strong> {scoreToPercentage(readiness.structuralCompleteness)}</div>
          <div className="grid-item"><strong>Variable Definition Quality:</strong> {scoreToPercentage(readiness.variableDefinitionQuality)}</div>
          <div className="grid-item"><strong>Constraint Definition Quality:</strong> {scoreToPercentage(readiness.constraintDefinitionQuality)}</div>
          <div className="grid-item"><strong>Objective Clarity:</strong> {scoreToPercentage(readiness.objectiveClarity)}</div>
          <div className="grid-item"><strong>Solver Input Readiness:</strong> {scoreToPercentage(readiness.solverInputReadiness)}</div>
        </div>

        {readiness.missingCriticalFields && readiness.missingCriticalFields.length > 0 && (
          <div className="missing-fields">
            <h4>Missing Critical Information</h4>
            <ul>
              {readiness.missingCriticalFields.map((field, index) => <li key={index}>{field}</li>)}
            </ul>
          </div>
        )}

        <div className="needs-flags">
          <p><strong>Normalization Needed:</strong> {readiness.normalizationNeeded ? 'Yes' : 'No'}</p>
          <p><strong>Transformation Needed:</strong> {readiness.transformationNeeded ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default DataReadinessCard;
