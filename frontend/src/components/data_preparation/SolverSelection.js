import React from 'react';
import Card from '../common/Card';

function SolverSelection({ solvers, selectedSolver, onSelect }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-2">1. Select a Solver</h3>
      <select 
        onChange={(e) => onSelect(solvers.find(s => s.id === e.target.value))} 
        value={selectedSolver ? selectedSolver.id : ''}
        className="w-full p-2 border rounded bg-gray-50"
      >
        <option value="" disabled>Choose a solver...</option>
        {solvers.map(solver => (
          <option key={solver.id} value={solver.id}>{solver.name}</option>
        ))}
      </select>
      {selectedSolver && (
        <p className="text-sm text-gray-600 mt-2">{selectedSolver.description}</p>
      )}
    </Card>
  );
}

export default SolverSelection;
