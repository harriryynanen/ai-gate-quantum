
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ExecutionTimeline from '../components/execution/ExecutionTimeline';
import JobStatus from '../components/execution/JobStatus';
import CodeSnapshotPanel from '../components/job/CodeSnapshotPanel';
import LogViewer from '../components/job/LogViewer';
import Card from '../components/common/Card';
import ExecutionMetadata from '../components/execution/ExecutionMetadata';
import { SessionContext } from '../context/SessionContext';
import { api } from '../services/api';

function ExecutionMonitor() {
  const navigate = useNavigate();
  const { session, setSession } = useContext(SessionContext);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const jobId = session?.job?.id;

  useEffect(() => {
    if (!jobId) {
      setError('No job ID found in the session.');
      return;
    }

    const pollStatus = async () => {
      try {
        const jobStatus = await api.getJobStatus(jobId);
        setStatus(jobStatus);

        if (jobStatus.status === 'complete' || jobStatus.status === 'failed') {
          // Stop polling and refetch the full session to get final results
          const updatedSession = { ...session }; // Create a shallow copy
          updatedSession.job.status = jobStatus.status; 
          if(jobStatus.status === 'complete') {
            const results = await api.getResults(jobId); 
            updatedSession.job.results = results;
          }
          setSession(updatedSession);
        } else {
          // Poll again after a delay
          setTimeout(pollStatus, 2000);
        }
      } catch (err) {
        setError('Failed to get job status');
        console.error(err);
      }
    };

    pollStatus();

  }, [jobId, session, setSession]);

  const { timeline = [], logs = [] } = status || {};
  const currentStageIndex = timeline.findIndex(s => s.status === 'running');
  const isComplete = status?.status === 'complete';

  const code = `// Placeholder for actual solver code
function solve(data) {
  // Solver logic goes here...
  return { success: true };
}`;

  const metadata = {
      user: 'demo_user',
      dataset: session?.dataset?.name || 'N/A',
      method: session?.job?.config?.method?.name || 'N/A',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Execution Monitor</h1>
        {isComplete && (
          <button 
            onClick={() => navigate(`/results`)} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Results
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Execution Progress</h3>
            <ExecutionTimeline stages={timeline} currentStage={currentStageIndex} />
          </Card>
          <div className="mt-6">
            <LogViewer logs={logs} />
          </div>
        </div>
        
        <div>
          <JobStatus status={status?.status || 'pending'} stageName={timeline[currentStageIndex]?.name || 'Initializing'} />
          <div className="mt-6">
            <ExecutionMetadata metadata={metadata} />
          </div>
          <div className="mt-6">
             <CodeSnapshotPanel code={code} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExecutionMonitor;
