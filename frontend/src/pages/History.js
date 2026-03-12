
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHistory()
      .then(sessions => setHistory(sessions))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getStatusPill = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageLink = (session) => {
    const base = `?session=${session.id}`;
    switch (session.currentStage) {
        case 'data': return `/data-preparation${base}`;
        case 'config': return `/job-configuration${base}`;
        case 'execution': return `/execution${base}`;
        case 'results': return `/results${base}`;
        default: return `/dashboard${base}`;
    }
  }

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading job history...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Session History</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {history.length > 0 ? history.map((session) => (
              <Link to={getStageLink(session)} key={session.id} className="block p-5 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg text-gray-900">{session.title}</p>
                      <p className="text-sm text-gray-600 truncate max-w-lg">{session.goal}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusPill(session.status)}`}>
                            {session.status}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">{session.createdAt?.toDate ? session.createdAt.toDate().toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>
              </Link>
            )) : (
                <div className="p-5 text-center text-gray-500">No history found.</div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default History;
