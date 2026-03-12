import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import JobListItem from '../components/job/JobListItem';

const recentJobs = [
  { id: 'session-abc-123', name: 'Q3 Financial Risk Analysis', status: 'Completed', timestamp: new Date(Date.now() - 86400000).toISOString() },
  { id: 'session-def-456', name: 'Equity Option Pricing Model', status: 'Running', timestamp: new Date().toISOString() },
  { id: 'session-ghi-789', name: 'Supply Chain Cost Optimization', status: 'Failed', timestamp: new Date(Date.now() - 172800000).toISOString() },
];

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analysis Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Start New Analysis</h2>
          <p className="mb-4">Use our AI Assistant to guide you through setting up and running a new computational job.</p>
          <Link to="/chat" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
            Start with AI Chat &rarr;
          </Link>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-2">View Job History</h2>
          <p className="mb-4">Browse through all your past and present analysis sessions.</p>
          <Link to="/history" className="text-blue-500 hover:underline">Go to Job History &rarr;</Link>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
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
