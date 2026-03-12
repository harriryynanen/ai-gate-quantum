
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';

function Execution() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session');
  const { session } = useContext(SessionContext);
  const job = session?.job;

  useEffect(() => {
    if (job?.status === 'completed') {
      // When the job is done, navigate to results page.
      // The results are already being loaded by the session context.
      const timer = setTimeout(() => {
        navigate(`/results?session=${sessionId}`);
      }, 1500); // Add a small delay to show the final status
      return () => clearTimeout(timer);
    }
  }, [job, navigate, sessionId]);

  if (!job) {
    return <div className="container mx-auto p-8 text-center">Loading execution status...</div>;
  }

  const { status, progress, logEntries, method } = job;

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Executing Analysis</h1>
        <p className="text-lg text-gray-600 mb-8">Your job is being processed using the <span className="font-bold">{method.name}</span> method. Please wait.</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-8 mb-4 shadow-inner">
          <div 
            className="bg-blue-600 h-8 rounded-full text-center text-white font-bold text-sm flex items-center justify-center transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
        
        <div className="text-center font-semibold text-gray-700 mb-8">Status: {status.toUpperCase()}</div>

        {/* Log Viewer */}
        <div className="bg-gray-900 text-white font-mono text-sm rounded-lg shadow-lg p-6 h-96 overflow-y-auto">
          {(logEntries || []).slice().reverse().map((log, index) => (
            <div key={index} className={`flex border-b border-gray-700 py-1 ${log.level === 'error' ? 'text-red-400' : 'text-gray-300'}`}>
              <span className="pr-4 opacity-50">{new Date(log.timestamp.toDate()).toLocaleTimeString()}</span>
              <span>{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Execution;
