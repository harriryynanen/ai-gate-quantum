
import React from 'react';

const ClassicalBaselineResultsView = ({ results }) => {
  if (!results) return <p>No specific results available.</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 my-4">
      <h3 className="text-xl font-bold mb-4">Classical Baseline Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Objective Value</p>
          <p className="text-lg font-semibold">{results.objectiveValue ?? 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Feasibility</p>
          <p className={`text-lg font-semibold ${results.isFeasible ? 'text-green-600' : 'text-red-600'}`}>
            {results.isFeasible ? 'Feasible' : 'Infeasible'}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">Constraint Satisfaction</p>
        <pre className="bg-gray-100 p-2 rounded-md text-sm">{JSON.stringify(results.constraintSatisfaction, null, 2) ?? 'N/A'}</pre>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">Baseline Interpretation</p>
        <p>{results.baselineInterpretation ?? 'No interpretation provided.'}</p>
      </div>
    </div>
  );
};

export default ClassicalBaselineResultsView;
