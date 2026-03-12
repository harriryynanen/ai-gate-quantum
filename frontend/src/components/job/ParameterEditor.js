import React from 'react';
import Card from '../common/Card';

function ParameterEditor({ solver }) {
  if (!solver || !solver.parameters) return null;

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-3">Solver Parameters</h3>
      <div className="space-y-4">
        {solver.parameters.map(param => (
          <div key={param.id}>
            <label htmlFor={param.id} className="block text-sm font-medium text-gray-700">
              {param.name} <span className="text-gray-400">({param.type})</span>
            </label>
            <input
              type={param.type === 'integer' ? 'number' : 'text'}
              id={param.id}
              defaultValue={param.defaultValue}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">{param.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ParameterEditor;
