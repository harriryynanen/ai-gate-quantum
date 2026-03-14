import React from 'react';
import './PathRecommendation.css';

const recommendationData = {
  recommendedPath: 'Quantum',
  reasoning: 'Your goal to optimize logistics routes across multiple depots has a high number of variables and constraints, making it a classic combinatorial optimization problem. A quantum-inspired approach is best suited for exploring the vast solution space efficiently.',
  alternatives: [
    {
      path: 'Classical',
      tradeoffs: 'Provides a deterministic, baseline solution. It will be faster to execute but is unlikely to find the true optimal route compared to a quantum approach.',
    },
    {
      path: 'Hybrid',
      tradeoffs: 'Not recommended for this problem type. Hybrid methods are better suited for tasks involving complex machine learning models, not pure optimization.',
    },
  ],
  nextAction: 'Accept the Quantum path to proceed with data mapping for the recommended solver.'
};

const PathCard = ({ path, details, isRecommended }) => (
  <div className={`path-card ${isRecommended ? 'recommended' : 'alternative'}`}>
    <div className="path-card-header">
      <span className="path-title">{path}</span>
      {isRecommended && <span className="recommended-badge">Recommended by AI</span>}
    </div>
    <p className="path-details">{details}</p>
  </div>
);

const PathRecommendation = () => {
  const { recommendedPath, reasoning, alternatives, nextAction } = recommendationData;

  return (
    <div className="path-recommendation-container">
      <div className="ai-summary-panel">
        <h3>AI Analysis Summary</h3>
        <p className="summary-reasoning">{reasoning}</p>
        <div className="next-action-hint">
          <strong>Next Best Action:</strong> {nextAction}
        </div>
      </div>

      <div className="path-selection-ui">
        <PathCard
          path={recommendedPath}
          details="This approach is ideal for your complex problem, offering the potential for a significantly better solution."
          isRecommended={true}
        />
        <div className="alternatives-section">
          <h4>Alternatives & Tradeoffs</h4>
          {alternatives.map(alt => (
            <PathCard
              key={alt.path}
              path={alt.path}
              details={alt.tradeoffs}
              isRecommended={false}
            />
          ))}
        </div>
      </div>
      
      <div className="wizard-actions">
        <button className="button-primary">Accept & Continue</button>
        <button className="button-secondary">Review Solvers Manually</button>
      </div>
    </div>
  );
};

export default PathRecommendation;
