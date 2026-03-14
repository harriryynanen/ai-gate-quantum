import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './JobHistory.css'; // New CSS for the history table layout

const JobHistory = () => {
  const allJobs = [
    { id: 'job-122', name: 'VQE Ground State', date: '2023-10-26', duration: '15m 32s', status: 'Completed' },
    { id: 'job-121', name: 'Q-Anneal Simulation', date: '2023-10-25', duration: '5m 10s', status: 'Completed' },
    { id: 'job-120', name: 'TSP Optimization', date: '2023-10-25', duration: '2m 05s', status: 'Failed' },
  ];

  const [filter, setFilter] = useState('');

  const filteredJobs = allJobs.filter(job => 
    job.name.toLowerCase().includes(filter.toLowerCase()) ||
    job.id.toLowerCase().includes(filter.toLowerCase())
  );

  const getStatusClass = (status) => {
    if (status === 'Completed') return 'status-completed';
    if (status === 'Failed') return 'status-failed';
    return '';
  };

  return (
    <div className="job-history-page">
      <div className="history-header">
        <h1>Job History</h1>
        <p>Review your past and current analysis jobs.</p>
      </div>

      <div className="filters">
        <input 
          type="text"
          placeholder="Filter by name or ID..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table className="history-table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Name</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map(job => (
            <tr key={job.id}>
              <td><Link to={`/results?jobId=${job.id}`}>{job.id}</Link></td>
              <td>{job.name}</td>
              <td>{job.date}</td>
              <td>{job.duration}</td>
              <td>
                <span className={`status-badge ${getStatusClass(job.status)}`}>
                  {job.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobHistory;
