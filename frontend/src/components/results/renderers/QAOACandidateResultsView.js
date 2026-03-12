
import React from 'react';
import { ChartPieIcon, CheckCircleIcon, CubeIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';

const ResultItem = ({ icon: Icon, label, value, unit }) => (
  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
    <Icon className="h-8 w-8 text-teal-500 mr-4 flex-shrink-0" />
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-900">{value} <span className="text-base font-normal text-gray-600">{unit}</span></p>
    </div>
  </div>
);

const QAOACandidateResultsView = ({ results }) => {
  if (!results) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center mb-4">
        <PuzzlePieceIcon className="h-8 w-8 text-teal-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">QAOA Candidate Search Results</h2>
      </div>

      {results.summary && (
        <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <h3 className="font-bold text-teal-800 mb-1">Solver Summary</h3>
          <p className="text-teal-700">{results.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ResultItem 
            icon={ChartPieIcon} 
            label="Estimated Objective Value"
            value={results.objectiveValue}
        />
        <ResultItem 
            icon={CheckCircleIcon} 
            label="Confidence Score"
            value={`${(results.confidenceScore * 100).toFixed(1)}%`}
        />
        <ResultItem 
            icon={CubeIcon} 
            label="Circuit Depth (p)"
            value={results.circuitDepth}
        />
        <ResultItem 
            icon={CubeIcon} 
            label="Shots"
            value={results.shots}
        />
      </div>

      <div className="mt-4">
          <p className="text-sm font-medium text-gray-500 mb-2">Most Probable Solution Bitstring</p>
          <div className="p-3 bg-gray-100 rounded font-mono text-center text-gray-800">
              {results.mostProbableSolution}
          </div>
      </div>

      <div className="mt-6 p-3 bg-red-50 text-red-800 border-l-4 border-red-400">
        <p><span className="font-bold">Caveat:</span> This result is a candidate from a simulation. It is not proof of quantum advantage but rather an indicator of a promising circuit for a real QPU.</p>
      </div>
    </div>
  );
};

export default QAOACandidateResultsView;
