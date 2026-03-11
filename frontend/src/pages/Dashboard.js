import React from 'react';
import JobListItem from '../components/job/JobListItem';
import Card from '../components/common/Card';

const mockJobs = [
  {
    id: '123',
    name: 'Quantum Simulation',
    status: 'succeeded',
    createdAt: '2023-10-27T10:00:00Z',
  },
  {
    id: '124',
    name: 'Protein Folding',
    status: 'running',
    createdAt: '2023-10-27T11:30:00Z',
  },
  {
    id: '125',
    name: 'Financial Modeling',
    status: 'failed',
    createdAt: '2023-10-26T15:00:00Z',
  },
];

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Card title="Recent Jobs">
        <div>
          {mockJobs.map(job => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
