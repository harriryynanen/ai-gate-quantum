
import React from 'react';
import { CheckCircleIcon, ChartBarIcon, ClockIcon, CpuChipIcon } from '@heroicons/react/24/outline';

const ResultItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
    <Icon className="h-8 w-8 text-indigo-500 mr-4" />
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const ResultsCard = ({ results }) => {
  if (!results) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-16 bg-gray-200 rounded-lg"></div>
          <div className="h-16 bg-gray-200 rounded-lg"></div>
          <div className="h-16 bg-gray-200 rounded-lg"></div>
          <div className="h-16 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Execution Results</h2>
      
      <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <h3 className="font-bold text-indigo-800 mb-1">AI Summary</h3>
        <p className="text-indigo-700">
          {results.summary || 'No summary available.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ResultItem 
          icon={ChartBarIcon} 
          label="Final Objective Value" 
          value={results.objectiveValue}
        />
        <ResultItem 
          icon={ClockIcon} 
          label="Solver Runtime" 
          value={results.solverRuntime}
        />
        <ResultItem 
          icon={CpuChipIcon} 
          label="Solver Iterations" 
          value={results.iterations}
        />
        <ResultItem 
          icon={CheckCircleIcon} 
          label="Confidence Score" 
          value={`${(results.confidenceScore * 100).toFixed(1)}%`}
        />
      </div>
    </div>
  );
};

export default ResultsCard;
