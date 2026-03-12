import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionHeader from '../components/session/SessionHeader';
import ExecutionTimeline from '../components/execution/ExecutionTimeline';
import JobStatus from '../components/execution/JobStatus';
import CodeSnapshotPanel from '../components/job/CodeSnapshotPanel';
import LogViewer from '../components/job/LogViewer';
import QuantumMetadataPanel from '../components/execution/QuantumMetadataPanel';
import Card from '../components/common/Card';
import { SessionContext } from '../context/SessionContext';
import { mockExecution } from '../mocks/mockData';

function ExecutionMonitor() {
  const { session } = useContext(SessionContext);
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);

  const { timeline, logs, quantumDetails } = mockExecution;
  const solver = session.solver;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage(prev => {
        if (prev >= timeline.length - 1) {
          clearInterval(interval);
          setTimeout(() => navigate('/results'), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [timeline.length, navigate]);

  const activeStage = timeline[currentStage];
  const visibleLogs = logs.filter(log => log.stage <= currentStage);

  return (
    <div>
      <SessionHeader />
      <h2 className="text-2xl font-bold mb-4">Execution Monitor</h2>
      
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
             <CodeSnapshotPanel code={solver?.code} />
          </div>
          {solver?.type === 'quantum_simulation' && quantumDetails && (
              <div className="mt-6">
                <QuantumMetadataPanel details={quantumDetails} />
              </div>
            )}
        </div>
      </div>

       <div className="mt-8 flex justify-end">
          <button 
            onClick={() => navigate('/results')} 
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={currentStage < timeline.length - 1}
          >
            Go to Results &rarr;
          </button>
        </div>
    </div>
  );
}

export default ExecutionMonitor;
