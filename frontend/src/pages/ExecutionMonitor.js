import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExecutionTimeline from '../components/execution/ExecutionTimeline';
import JobStatus from '../components/execution/JobStatus';
import CodeSnapshotPanel from '../components/job/CodeSnapshotPanel';
import LogViewer from '../components/job/LogViewer';
import Card from '../components/common/Card';
import ExecutionMetadata from '../components/execution/ExecutionMetadata'; // Import the new component
import { mockExecution } from '../mocks/mockData';

function ExecutionMonitor() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);

  const { timeline, logs, code, metadata } = mockExecution; // Get metadata from mock

  const isComplete = currentStage >= timeline.length - 1;

  useEffect(() => {
    if (isComplete) return;

    const interval = setInterval(() => {
      setCurrentStage(prev => prev + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, [isComplete]);

  const activeStage = timeline[currentStage];
  const visibleLogs = logs.filter(log => log.stage <= currentStage);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Execution Monitor</h1>
        {isComplete && (
          <button 
            onClick={() => navigate(`/results/session-${Date.now()}`)} 
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
            <ExecutionTimeline stages={timeline} currentStage={currentStage} />
          </Card>
          <div className="mt-6">
            <LogViewer logs={visibleLogs} />
          </div>
        </div>
        
        <div>
          <JobStatus status={activeStage.status} stageName={activeStage.name} />
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
