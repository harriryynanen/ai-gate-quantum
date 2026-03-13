
import React from 'react';

const QuantumInspiredAnnealingResultsView = ({ results }) => {
  if (!results) return <p>No specific results available.</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-4">
      <h3 className="text-xl font-bold mb-4">Quantum-Inspired Annealing Details</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Optimization Framing</p>
          <p>{results.optimizationFraming ?? 'Not specified.'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Search Space Interpretation</p>
          <p>{results.searchSpaceInterpretation ?? 'Not specified.'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Annealing Tradeoffs</p>
          <p>{results.annealingTradeoffs ?? 'Not specified.'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Exploratory Caveats</p>
          <ul className="list-disc list-inside bg-yellow-50 p-3 rounded-md">
            {results.exploratoryCaveats?.map((caveat, index) => (
              <li key={index} className="text-yellow-800">{caveat}</li>
            )) ?? <li>No caveats provided.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuantumInspiredAnnealingResultsView;
