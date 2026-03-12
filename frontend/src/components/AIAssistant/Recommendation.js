import React from 'react';

const Recommendation = ({ recommendation }) => {
  if (!recommendation) return null;

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h4 className="font-bold text-md">Why this is recommended</h4>
        <p className="text-sm text-gray-700 mt-1">{recommendation}</p>
    </div>
  );
};

export default Recommendation;
