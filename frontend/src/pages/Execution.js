
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';

function Execution() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session');
  const { execution, loading } = useContext(SessionContext);

  useEffect(() => {
    if (execution?.status === 'completed' || execution?.status === 'failed') {
      const timer = setTimeout(() => {
        navigate(`/results?session=${sessionId}`);
      }, 1500); // Add a small delay to show the final status
      return () => clearTimeout(timer);
    }
  }, [execution, navigate, sessionId]);

  if (loading && !execution) {
    return <div className="container mx-auto p-8 text-center">Initializing execution...</div>;
  }

  if (!execution) {
    return <div className="container mx-auto p-8 text-center">Waiting for execution to start...</div>;
  }

  const { status } = execution;

  // A simple progress simulation based on status
  const progress = status === 'queued' ? 25 : status === 'running' ? 75 : 100;

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Executing Analysis</h1>
        <p className="text-lg text-gray-600 mb-8">Your job is being processed. Please wait.</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-8 mb-4 shadow-inner">
          <div 
            className="bg-blue-600 h-8 rounded-full text-center text-white font-bold text-sm flex items-center justify-center transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
        
        <div className="text-center font-semibold text-gray-700 mb-8">Status: {status ? status.toUpperCase() : 'Initializing'}</div>

        {/* Log Viewer - Placeholder for now */}
        <div className="bg-gray-900 text-white font-mono text-sm rounded-lg shadow-lg p-6 h-96 overflow-y-auto">
          <p className="text-gray-400">Real-time logs will be displayed here...</p>
          {/* When logs are implemented, they can be mapped here */}
        </div>
      </div>
    </div>
  );
}

export default Execution;
