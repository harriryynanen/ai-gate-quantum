import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import JobListItem from '../components/job/JobListItem';

const recentJobs = [
  { id: 'job-123', name: 'Financial Forecast Q3', status: 'Completed', timestamp: '2024-07-30' },
  { id: 'job-124', name: 'Market Risk Simulation', status: 'Running', timestamp: '2024-07-31' },
  { id: 'job-125', name: 'Supply Chain Optimization', status: 'Failed', timestamp: '2024-07-29' },
];

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <h2 className="text-xl font-semibold mb-2">Start a New Job</h2>
          <p className="mb-4">Begin by preparing your data and configuring a new analysis job.</p>
          <Link to="/data" className="text-blue-500 hover:underline">Go to Data Preparation &rarr;</Link>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-2">View Job History</h2>
          <p className="mb-4">Browse through all your past and present jobs.</p>
          <Link to="/history" className="text-blue-500 hover:underline">Go to Job History &rarr;</Link>
        </Card>
         <Card>
          <h2 className="text-xl font-semibold mb-2">AI Chat Workspace</h2>
          <p className="mb-4">Discuss your analysis goals with the AI assistant.</p>
          <Link to="/chat" className="text-blue-500 hover:underline">Go to AI Chat &rarr;</Link>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>
        <div className="space-y-4">
          {recentJobs.map(job => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
