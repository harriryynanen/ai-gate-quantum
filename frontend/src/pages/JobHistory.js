
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import JobListItem from '../components/job/JobListItem';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function JobHistory() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const historyData = await api.getHistory();
        setSessions(historyData);
      } catch (err) {
        setError("Failed to load session history. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = sessions
    .filter(session => (session.title || '').toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(session => statusFilter === 'all' || (session.status && session.status.toLowerCase() === statusFilter));

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-8">
        <h1 className="text-4xl font-bold mb-6">Session History</h1>
        
        <div className="bg-white shadow-md rounded-lg p-4">
          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search sessions by title..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="p-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="running">Running</option>
              <option value="failed">Failed</option>
              <option value="queued">Queued</option>
            </select>
          </div>

          {/* Content Area */}
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading history...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : filteredHistory.length > 0 ? (
            <div className="space-y-4">
              {filteredHistory.map(session => (
                <JobListItem key={session.id} session={session} />
              ))
            }
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No sessions found that match your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobHistory;
