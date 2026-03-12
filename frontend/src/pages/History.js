
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await api.getHistory();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleAction = (action, item) => {
      // Mock actions - in a real app, this would involve state management
      console.log(`Action '${action}' selected for job ${item.job.id}`);
      switch(action) {
        case 'results':
            // In a real app, you would fetch and set this specific session/job
            alert(`(MOCK) Navigating to results for job ${item.job.id}.`);
            // navigate('/results'); // This would need context restoration
            break;
        case 'rerun':
            alert(`(MOCK) Re-running job ${item.job.id} with the alternative method.`);
            // navigate('/job-configuration'); // This would need context restoration
            break;
        case 'compare':
            alert(`(MOCK) Comparing job ${item.job.id} with its baseline.`);
            break;
        default:
            break;
      }
  }

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading job history...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Job History</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Session Goal
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Job ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Method Used
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{item.goal}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap font-mono text-xs">{item.job.id}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.job.config.method.type.includes('quantum') ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {item.job.config.method.name}
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span
                    className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight`}>
                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative">{item.job.status}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => handleAction('results', item)} className="text-indigo-600 hover:text-indigo-900 mr-3">Results</button>
                    <button onClick={() => handleAction('rerun', item)} className="text-gray-600 hover:text-gray-900 mr-3">Re-run</button>
                    <button onClick={() => handleAction('compare', item)} className="text-gray-600 hover:text-gray-900">Compare</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
