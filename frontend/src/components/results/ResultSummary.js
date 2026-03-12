import React from 'react';

const ResultSummary = ({ summary }) => {
  if (!summary) return null;
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">{summary.title}</h3>
      <p className="mb-2">{summary.finding}</p>
      <p className="text-sm"><strong>Confidence:</strong> <span className="font-mono bg-gray-100 px-2 py-1 rounded">{summary.confidence}</span></p>
    </div>
  );
};

export default ResultSummary;
