
import React from 'react';
import { ScaleIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const ResultItem = ({ icon: Icon, label, value, unit }) => (
  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
    <Icon className="h-8 w-8 text-blue-500 mr-4 flex-shrink-0" />
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-900">{value} <span className="text-base font-normal text-gray-600">{unit}</span></p>
    </div>
  </div>
);

const ClassicalBaselineResultsView = ({ results }) => {
  if (!results) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
            <ScaleIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Classical Baseline Solver Results</h2>
        </div>

      {results.summary && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-1">Solver Summary</h3>
          <p className="text-blue-700">{results.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ResultItem 
            icon={ArrowPathIcon} 
            label="Objective Value"
            value={results.objectiveValue}
        />
        <ResultItem 
            icon={ClockIcon} 
            label="Solver Runtime"
            value={results.solverRuntime} 
        />
        <ResultItem 
            icon={ScaleIcon} 
            label="Iterations Completed"
            value={results.iterations}
            unit="iterations"
        />
      </div>

      {results.warnings && (
          <div className="mt-6 p-3 bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400">
              <p><span className="font-bold">Warning:</span> {results.warnings}</p>
          </div>
      )}
    </div>
  );
};

export default ClassicalBaselineResultsView;
