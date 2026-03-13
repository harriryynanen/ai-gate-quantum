
import React from 'react';

const QAOACandidateResultsView = ({ results }) => {
  if (!results) return <p>No specific results available.</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-4">
      <h3 className="text-xl font-bold mb-4">QAOA Candidate Details</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Exploratory Status</p>
          <p className="font-semibold text-blue-700">{results.exploratoryStatus ?? 'Not specified.'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Conceptual Mapping Quality</p>
          <p>{results.conceptualMappingQuality ?? 'Not specified.'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Limitations</p>
          <ul className="list-disc list-inside bg-gray-100 p-3 rounded-md">
            {results.limitations?.map((limitation, index) => (
              <li key={index}>{limitation}</li>
            )) ?? <li>No limitations specified.</li>}
          </ul>
        </div>
        <div className="mt-4 border-t pt-4">
            <p className="text-sm font-bold text-red-700">Quantum Advantage Disclaimer</p>
            <p className="text-red-600 bg-red-50 p-3 rounded-md">{results.quantumAdvantageDisclaimer ?? 'Not specified.'}</p>
        </div>
      </div>
    </div>
  );
};

export default QAOACandidateResultsView;
