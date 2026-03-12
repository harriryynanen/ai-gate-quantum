
import React from 'react';
import { FireIcon, BeakerIcon, ClockIcon, ThermometerIcon } from '@heroicons/react/24/outline';

const ResultItem = ({ icon: Icon, label, value, unit }) => (
  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
    <Icon className="h-8 w-8 text-purple-500 mr-4 flex-shrink-0" />
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-900">{value} <span className="text-base font-normal text-gray-600">{unit}</span></p>
    </div>
  </div>
);

const QuantumInspiredAnnealingResultsView = ({ results }) => {
  if (!results) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
            <FireIcon className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Quantum-Inspired Annealing Results</h2>
        </div>

      {results.summary && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-800 mb-1">Solver Summary</h3>
          <p className="text-purple-700">{results.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ResultItem 
            icon={BeakerIcon} 
            label="Final Objective Value"
            value={results.objectiveValue}
        />
        <ResultItem 
            icon={ThermometerIcon} 
            label="Final Energy Delta"
            value={results.energyDelta}
        />
        <ResultItem 
            icon={ClockIcon} 
            label="Annealing Time"
            value={results.annealingTime}
        />
         <ResultItem 
            icon={FireIcon} 
            label="Effective Qubits"
            value={results.effectiveQubits}
        />
      </div>
      <div className="mt-6 p-3 bg-blue-50 text-blue-800 border-l-4 border-blue-400">
        <p><span className="font-bold">Interpretation Note:</span> Quantum-inspired annealing uses classical hardware to simulate quantum processes, which is useful for large-scale combinatorial optimization problems.</p>
      </div>
    </div>
  );
};

export default QuantumInspiredAnnealingResultsView;
