import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ExecutionTimeline from '../components/execution/ExecutionTimeline';
import JobStatus from '../components/execution/JobStatus';
import CodeSnapshotPanel from '../components/job/CodeSnapshotPanel';
import LogViewer from '../components/job/LogViewer';
import Card from '../components/common/Card';
import { SessionContext } from '../context/SessionContext';
import { mockExecution } from '../mocks/mockData';

function ExecutionMonitor() {
  const { session } = useContext(SessionContext);
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);

  const { timeline, logs } = mockExecution;
  const code = `def solve(data):
    # Quantum-inspired optimization logic
    print("Analyzing risk...")
    return {'optimal_risk': 0.42}`

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage(prev => {
        if (prev >= timeline.length - 1) {
          clearInterval(interval);
          setTimeout(() => navigate(`/results/session-${Date.now()}`), 2000);
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
      <h1 className="text-3xl font-bold mb-6">Execution Monitor</h1>
      
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
             <CodeSnapshotPanel code={code} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExecutionMonitor;
