import React, { useState, useEffect } from 'react';
import './ExecutionMonitor.css'; // New CSS for the monitor layout

const ExecutionMonitor = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [logs, setLogs] = useState([
    '[INFO] Job execution started.',
    '[INFO] Preparing quantum circuit...',
  ]);

  // Simulate live updates
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 5 : 100));
      setElapsedTime(prev => prev + 1);
    }, 1000);

    if (progress >= 20 && status === 'Initializing') setStatus('Running');
    if (progress >= 100 && status === 'Running') setStatus('Finalizing');

    return () => clearInterval(timer);
  }, [progress, status]);

  return (
    <div className="execution-monitor-page">
      <div className="monitor-header">
        <h1>Execution Monitor: Job #123</h1>
        <p>Tracking live progress of your analysis job.</p>
      </div>

      <div className="status-overview">
        <div className="status-card">
          <h3>Status</h3>
          <p>{status}</p>
        </div>
        <div className="status-card">
          <h3>Progress</h3>
          <p>{progress}%</p>
        </div>
        <div className="status-card">
          <h3>Elapsed Time</h3>
          <p>{elapsedTime}s</p>
        </div>
      </div>

      <div className="log-viewer">
        {logs.map((log, i) => (
          <div key={i} className="log-line">{log}</div>
        ))}
      </div>

      <div className="metadata-section">
        <h2>Job Details</h2>
        <p><strong>Job ID:</strong> job-123</p>
        <p><strong>Solver:</strong> Q-Anneal Simulation</p>
      </div>
    </div>
  );
};

export default ExecutionMonitor;
