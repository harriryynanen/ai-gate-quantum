import React from 'react';
import HistoryItem from '../components/history/HistoryItem';

// Mock data for session history
const historyData = [
  {
    id: 'session-xyz-789',
    goal: 'Q3 Financial Risk Analysis',
    status: 'Completed',
    timestamp: '2 days ago',
  },
  {
    id: 'session-abc-123',
    goal: 'Supply Chain Optimization',
    status: 'In Progress',
    timestamp: '2 hours ago',
  },
  {
    id: 'session-def-456',
    goal: 'Customer Churn Prediction',
    status: 'Failed',
    timestamp: '1 week ago',
  },
];

function History() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Session History</h1>
      <div className="space-y-6">
        {historyData.map(item => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default History;
