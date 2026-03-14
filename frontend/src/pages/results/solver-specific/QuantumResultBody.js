import React from 'react';
import '../Results.css';

const QuantumResultBody = ({ result }) => {
  if (!result || !result.solverSpecificResults) return null;

  const { 
    exploratoryStatus,
    conceptualMappingQuality,
    observed,
    inferredSolution,
    uncertainty
  } = result.solverSpecificResults;

  // Convert observed object to an array and sort by counts
  const sortedObservations = Object.entries(observed).sort(([, a], [, b]) => b - a);

  return (
    <div className="solver-output quantum-output">
      <h3>Exploratory Quantum Output (Simulated)</h3>
      
      <div className="status-banner">
        <p><strong>Status:</strong> {exploratoryStatus}</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-item">
          <span className="metric-label">Conceptual Mapping Quality</span>
          <span className="metric-value">{conceptualMappingQuality}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Inferred Solution</span>
          <span className="metric-value primary">{inferredSolution}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Uncertainty</span>
          <span className="metric-value secondary">{uncertainty}</span>
        </div>
      </div>

      <h4>Observed States (Top 3)</h4>
      <div className="observed-states">
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Counts</th>
            </tr>
          </thead>
          <tbody>
            {sortedObservations.slice(0, 3).map(([state, counts]) => (
              <tr key={state}>
                <td>{state}</td>
                <td>{counts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuantumResultBody;
