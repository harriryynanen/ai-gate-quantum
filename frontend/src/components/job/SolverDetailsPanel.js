import React from 'react';
import Card from '../common/Card';

const typeHelper = {
    'classical_python': { name: 'Classical Python', bg: 'bg-blue-100', text: 'text-blue-800' },
    'quantum_simulation': { name: 'Quantum Simulation', bg: 'bg-purple-100', text: 'text-purple-800' },
}

function SolverDetailsPanel({ solver }) {
  if (!solver) return null;

  const typeInfo = typeHelper[solver.type] || {};

  return (
    <Card>
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold mb-2">Selected Solver</h3>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeInfo.bg} ${typeInfo.text}`}>
            {typeInfo.name}
        </span>
      </div>
      <h4 className="font-bold text-xl text-gray-800 mb-1">{solver.name}</h4>
      <p className="text-sm text-gray-600 mb-4">{solver.description}</p>
      
      {solver.type === 'quantum_simulation' && (
        <div className="text-xs bg-purple-50 p-2 rounded-md border border-purple-200">
           <p><strong>V1 Execution Note:</strong> This solver uses a local quantum simulation via <strong>Qiskit + Aer</strong>. No real quantum hardware is used.</p>
        </div>
      )}
        <div className="text-xs bg-blue-50 p-2 rounded-md border border-blue-200 mt-2">
           <p><strong>Execution Note:</strong> All computation runs in a secure server-side <strong>Python</strong> environment.</p>
        </div>
    </Card>
  );
}

export default SolverDetailsPanel;
