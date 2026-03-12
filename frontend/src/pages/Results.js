
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';

function Results() {
  const navigate = useNavigate();
  const { session, setSession } = useContext(SessionContext);

  if (!session || !session.job || !session.job.results) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p>No results found. Please run a job first.</p>
        <button onClick={() => navigate('/job-configuration')} className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Configure a Job
        </button>
      </div>
    );
  }

  const { results, config } = session.job;
  const { method } = config;
  const isQuantum = method.type.includes('quantum');

  const handleRestart = () => {
    // Reset session but keep key info
    setSession(prev => ({
      id: `sid_${Date.now()}`,
      goal: "New analysis session",
      job: null,
      recommendation: null,
      dataset: prev.dataset, // Persist dataset if needed
    }));
    navigate('/');
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Analysis Results</h1>
        <p className="text-lg text-gray-600 mb-8">Review the outcome of your analysis.</p>
        
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Execution Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                <div>
                    <p className="font-semibold text-gray-600">Method Used:</p>
                    <p className={`font-bold ${isQuantum ? 'text-blue-600' : 'text-green-600'}`}>{method.name}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Path Selected:</p>
                    <p>{method.type === session.recommendation?.method.type ? "AI Recommended" : "User Override"}</p>
                </div>
            </div>
            <div className="mt-4">
                <p className="font-semibold text-gray-600">AI Summary:</p>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-md">{results.summary}</p>
            </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Raw Output Data</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-md text-sm">
            {JSON.stringify(results.rawOutput, null, 2)}
          </pre>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Recommended Next Steps</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <button onClick={handleRestart} className="flex-1 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition">
                    Accept & Start New Session
                </button>
                <button onClick={() => navigate('/job-configuration')} className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition">
                   Re-Run with Alternative Method
                </button>
                 <button onClick={() => navigate('/history')} className="flex-1 bg-white text-blue-600 font-bold py-3 px-4 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
                    Review Job History
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
