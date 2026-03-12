
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import Timeline from '../components/common/Timeline';
import { api } from '../services/api';

function Execution() {
  const navigate = useNavigate();
  const { session, setJobResults } = useContext(SessionContext);
  const [timeline, setTimeline] = useState([]);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('Initializing');

  const jobId = session?.job?.id;

  const pollStatus = useCallback(async () => {
    if (!jobId) return;

    try {
      const response = await api.getJobStatus(jobId);
      setTimeline(response.timeline || []);
      setLogs(response.logs || []);
      setStatus(response.status);

      if (response.status === 'complete') {
        // Fetch final results
        const finalResults = await api.getResults(jobId);
        setJobResults(finalResults);
      }
    } catch (error) {
      console.error("Error polling job status:", error);
      setStatus('failed');
    }
  }, [jobId, setJobResults]);

  useEffect(() => {
    if (!jobId) {
      // If there's no job, maybe we should redirect?
      navigate('/job-config');
      return;
    }

    // Start polling immediately and then set an interval
    pollStatus();
    const intervalId = setInterval(pollStatus, 2000); // Poll every 2 seconds

    // Cleanup on component unmount
    return () => clearInterval(intervalId);

  }, [jobId, navigate, pollStatus]);

  // Stop polling when the job is complete or failed
  useEffect(() => {
      if (status === 'complete' || status === 'failed') {
          const intervalId = setInterval(pollStatus, 2000); // a bit of a hack to clear interval after final poll
          setTimeout(() => clearInterval(intervalId), 100);
      }
  }, [status, pollStatus]);


  const handleViewResults = () => {
    navigate('/results');
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Executing Analysis</h1>
        <p className="text-xl text-gray-600 text-center mb-12">Your job is being processed. You can monitor the progress below.</p>

        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">Execution Status: <span className="text-blue-600 capitalize">{status}</span></h2>
          
          <Timeline events={timeline} />

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-2">Execution Logs</h3>
            <div className="bg-gray-900 text-white p-4 rounded-md font-mono text-sm h-48 overflow-y-auto">
              {logs.map((log, index) => <p key={index}>[{log.timestamp}] {log.message}</p>)}
            </div>
          </div>

          {status === 'complete' && (
            <div className="mt-10 text-center">
              <button 
                onClick={handleViewResults}
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 text-lg transition duration-300 ease-in-out transform hover:scale-105">
                View Results
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Execution;
