
import React from 'react';

export const CodeTransparencyCard = ({ solver }) => {
  if (!solver) return null;

  const getRuntimeStatus = () => {
    if (solver.isProduction) {
      return <span className="font-bold text-green-600">Active Backend Logic</span>;
    }
    if (solver.isReference) {
      return <span className="font-bold text-yellow-600">Reference-Only</span>;
    }
    return <span className="font-bold text-gray-500">Exploratory Placeholder</span>;
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Code & Execution Transparency</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-700">Active Runtime Path</h3>
          <p className="text-gray-600">Firebase deterministic backend (simulated, not real quantum execution yet)</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-700">Solver Reference Code</h3>
          <p className="text-gray-600">
            Find the reference implementation for this solver in the repository at:
            <code className="block bg-gray-200 p-2 rounded mt-2 text-sm">04_solvers/reference_code/python/{solver.id}.py</code>
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-700">Current Status of Mapped Solver</h3>
          <p className="text-gray-600">
            The selected solver is currently: {getRuntimeStatus()}
          </p>
        </div>
      </div>
    </div>
  );
};
