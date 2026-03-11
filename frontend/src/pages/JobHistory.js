import React, { useState } from 'react';
import JobListItem from '../components/job/JobListItem';
import Card from '../components/common/Card';

const mockJobs = [
  { id: '1', name: 'Old Simulation 1', status: 'succeeded', createdAt: '2023-01-15T10:00:00Z' },
  { id: '2', name: 'Old Simulation 2', status: 'failed', createdAt: '2023-01-16T12:00:00Z' },
  { id: '3', name: 'Recent Test', status: 'succeeded', createdAt: '2023-10-27T14:00:00Z' },
  { id: '4', name: 'Another Recent Job', status: 'succeeded', createdAt: '2023-10-28T16:00:00Z' },
];

function JobHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredJobs = mockJobs
    .filter(job => job.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(job => statusFilter === 'all' || job.status === statusFilter);

  return (
    <div>
      <h2>Job History</h2>
      <Card>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ flexGrow: 1, marginRight: '10px', padding: '8px' }}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value="all">All Statuses</option>
            <option value="succeeded">Succeeded</option>
            <option value="failed">Failed</option>
            <option value="running">Running</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div>
          {filteredJobs.map(job => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default JobHistory;
