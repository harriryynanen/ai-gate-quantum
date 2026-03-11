import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import LogViewer from '../components/job/LogViewer';
import JobProgress from '../components/job/JobProgress';
import StatusBadge from '../components/common/StatusBadge';

const mockLogs = [
  '[2023-10-27 11:30:00] Job started: Protein Folding',
  '[2023-10-27 11:30:05] Initializing solver: Qiskit VQE',
  '[2023-10-27 11:30:15] Pre-processing data...',
  '[2023-10-27 11:30:20] Data validation successful.',
  '[2023-10-27 11:30:30] Building quantum circuit.',
  '[2023-10-27 11:31:00] Executing on simulator...',
];

function ExecutionMonitor() {
  const { jobId } = useParams(); // In a real app, you'd fetch job details based on this
  const [job, setJob] = useState({ id: jobId || '124', name: 'Protein Folding', status: 'running', progress: 0 });
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setJob(prevJob => {
        const newProgress = prevJob.progress >= 100 ? 100 : prevJob.progress + 10;
        const newStatus = newProgress >= 100 ? 'succeeded' : 'running';
        return { ...prevJob, progress: newProgress, status: newStatus };
      });

      setLogs(prevLogs => {
        if (logs.length < mockLogs.length) {
          return [...prevLogs, mockLogs[prevLogs.length]];
        }
        return prevLogs;
      });

    }, 1000);

    return () => clearInterval(interval);
  }, [logs.length]);

  return (
    <div>
      <h2>Execution Monitor</h2>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>{job.name} (#{job.id})</h3>
          <StatusBadge status={job.status} />
        </div>

        <JobProgress progress={job.progress} />

        <LogViewer logs={logs} />

        <div style={{ marginTop: '20px' }}>
          {job.status === 'running' && <button>Cancel Job</button>}
          {job.status === 'succeeded' && <Link to={`/results/${job.id}`}><button>View Results</button></Link>}
          {job.status === 'failed' && <Link to="/job-configuration"><button>Retry Job</button></Link>}
        </div>
      </Card>
    </div>
  );
}

export default ExecutionMonitor;
