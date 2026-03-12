
import React from 'react';
import { ChartBarIcon, ClockIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const ResultItem = ({ label, value }) => (
  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
    <div className="ml-4">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-900">{String(value)}</p>
    </div>
  </div>
);


const GenericResultsView = ({ results }) => {
  if (!results) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
            <InformationCircleIcon className="h-8 w-8 text-gray-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Generic Solver Results</h2>
        </div>
      
      {results.summary && (
        <div className="mb-6 p-4 bg-gray-100 border border-gray-200 rounded-lg">
          <h3 className="font-bold text-gray-800 mb-1">AI Summary</h3>
          <p className="text-gray-700">{results.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Object.entries(results).map(([key, value]) => {
            if (key === 'summary') return null;
            return <ResultItem key={key} label={key} value={value} />
        })}
      </div>
      <div className="mt-6 p-3 bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400">
          <p><span className="font-bold">Note:</span> This is a generic view. For a more detailed analysis, a solver-specific renderer should be implemented.</p>
      </div>
    </div>
  );
};

export default GenericResultsView;
