
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';

function Results() {
  const { session } = useContext(SessionContext);

  const job = session?.job;
  const results = job?.results;
  const method = job?.config?.method;

  if (!job || !results) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">No Results Found</h1>
        <p className="text-xl text-gray-600 mb-8">It seems no job has been completed in this session.</p>
        <Link to="/" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">
          Start a New Session
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Analysis Results</h1>
          <Link to="/" className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-300">
            New Session
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Summary</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{results.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Method Used</h3>
              <p className="text-blue-600 font-bold text-xl">{method?.name || 'N/A'}</p>
              <p className="text-sm text-gray-600 capitalize mt-1">({method?.type?.replace('_', ' ') || 'N/A'})</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Job ID</h3>
              <p className="font-mono text-gray-800">{job.id}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Raw Output</h3>
            <pre className="bg-gray-900 text-white p-4 rounded-md font-mono text-sm overflow-x-auto">
              {JSON.stringify(results.rawOutput, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
