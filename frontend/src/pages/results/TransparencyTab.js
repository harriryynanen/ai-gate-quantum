import React from 'react';
import './Results.css';

const TransparencyTab = ({ result }) => {
  if (!result || !result.transparencyNotes) return null;

  return (
    <div className="tab-content">
      <h2>Transparency Report</h2>

      <div className="transparency-section">
        <h3>Execution Narrative</h3>
        <p>{result.transparencyNotes.executionNarrative}</p>
      </div>

      <div className="transparency-section">
        <h3>Guardrails & Limitations</h3>
        <ul>
          {result.transparencyNotes.guardrails.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
        {result.limitations && (
          <ul>
            {result.limitations.map((note, index) => (
              <li key={index} className="limitation-note">{note}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransparencyTab;
