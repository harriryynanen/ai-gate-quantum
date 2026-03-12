import React, { useState } from 'react';
import JobListItem from '../components/job/JobListItem';
import Card from '../components/common/Card';

const mockHistory = [
  { id: 'session-abc-123', name: 'Q3 Financial Risk Analysis', status: 'Completed', timestamp: new Date(Date.now() - 86400000).toISOString() },
  { id: 'session-def-456', name: 'Equity Option Pricing Model', status: 'Running', timestamp: new Date().toISOString() },
  { id: 'session-ghi-789', name: 'Supply Chain Cost Optimization', status: 'Failed', timestamp: new Date(Date.now() - 172800000).toISOString() },
  { id: 'session-jkl-012', name: 'Inventory Replenishment Simulation', status: 'Completed', timestamp: new Date(Date.now() - 259200000).toISOString() },
  { id: 'session-mno-345', name: 'Customer Churn Prediction', status: 'Completed', timestamp: new Date(Date.now() - 345600000).toISOString() },
];

function JobHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredHistory = mockHistory
    .filter(job => job.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(job => statusFilter === 'all' || job.status.toLowerCase() === statusFilter);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Session History</h1>
      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search sessions by name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-grow p-2 border rounded-lg"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="p-2 border rounded-lg bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="running">Running</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map(job => (
              <JobListItem key={job.id} job={job} />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No sessions found.</p>
          )}
        </div>
      </Card>
    </div>
  );
}

export default JobHistory;
