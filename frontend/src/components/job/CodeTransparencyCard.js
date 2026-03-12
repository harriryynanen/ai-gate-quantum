
import React from 'react';

export const CodeTransparencyCard = ({ solver }) => {
  if (!solver) return null;

  const getRuntimeStatusText = () => {
    switch (solver.runtimeStatus) {
      case 'active-backend':
        return <span className="font-bold text-green-600">Active Backend Logic</span>;
      case 'reference-only':
        return <span className="font-bold text-yellow-600">Reference-Only</span>;
      case 'exploratory-placeholder':
      default:
        return <span className="font-bold text-gray-500">Exploratory Placeholder</span>;
    }
  };

  const getRuntimeDescription = () => {
    switch (solver.runtimeStatus) {
      case 'active-backend':
        return "This solver is implemented as a deterministic Firebase Function. It represents our core, validated logic for this problem class. The execution is a high-fidelity simulation, not a real quantum computer.";
      case 'reference-only':
        return "This Python code is for reference and transparency. It is NOT the code that will be executed. The live backend logic is a separate, deterministic implementation based on this reference.";
      case 'exploratory-placeholder':
      default:
        return "This solver is a placeholder for a future capability. It is not yet implemented in the backend and cannot be executed.";
    }
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Code & Execution Transparency</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg text-gray-700 flex items-center">
            <span className="mr-2">Solver Runtime Status:</span> 
            {getRuntimeStatusText()}
          </h3>
          <p className="text-gray-600 mt-1">
            {getRuntimeDescription()}
          </p>
        </div>

        {solver.runtimeStatus !== 'exploratory-placeholder' && (
          <div>
            <h3 className="font-semibold text-lg text-gray-700">Solver Reference Code</h3>
            <p className="text-gray-600">
              Find the auditable reference implementation for this solver in the repository at:
              <code className="block bg-gray-200 p-2 rounded mt-2 text-sm">functions/src/solvers/reference_code/{solver.id}.py</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
