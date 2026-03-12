
import React from 'react';
import './ProblemFormulationCard.css';

const ProblemFormulationCard = ({ formulation }) => {
  if (!formulation) return <p>No formulation data available.</p>;

  return (
    <div className="card problem-formulation-card">
      <h3>Problem Formulation</h3>
      <div className="card-content">
        <p><strong>Problem Statement:</strong> {formulation.problemStatement}</p>
        <p><strong>Goal Type:</strong> {formulation.goalType}</p>
        <p><strong>Detected Problem Class:</strong> {formulation.candidateProblemClass}</p>
        <p><strong>Objective:</strong> {formulation.objectiveFunction || 'Not yet defined'}</p>
        <p><strong>Decision Variables:</strong> {formulation.decisionVariables.length > 0 ? formulation.decisionVariables.join(', ') : 'Not yet defined'}</p>
        <p><strong>Constraints:</strong> {formulation.constraints.length > 0 ? formulation.constraints.join(', ') : 'Not yet defined'}</p>
        <p><strong>Quantum Relevance:</strong> <span className={`relevance-${formulation.quantumRelevance?.toLowerCase()}`}>{formulation.quantumRelevance}</span></p>
        <p><strong>Classical Baseline Need:</strong> <span className={`relevance-${formulation.classicalBaselineNeed?.toLowerCase()}`}>{formulation.classicalBaselineNeed}</span></p>
        <p><strong>Confidence:</strong> {Math.round(formulation.formulationConfidence * 100)}%</p>
        <p className="user-notes"><strong>Notes:</strong> {formulation.notesForUser}</p>
        {formulation.formulationWarnings && formulation.formulationWarnings.length > 0 && (
          <div className="warnings">
            <h4>Warnings</h4>
            <ul>
              {formulation.formulationWarnings.map((warning, index) => <li key={index}>{warning}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemFormulationCard;
