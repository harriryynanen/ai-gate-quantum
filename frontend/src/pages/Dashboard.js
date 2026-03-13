
import React, { useState, useContext } from 'react';
import { SessionContext } from '../context/SessionContext.js';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { PlusIcon, BeakerIcon, CpuChipIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

const Dashboard = () => {
  const [goal, setGoal] = useState('');
  const [formError, setFormError] = useState(null);
  
  const {
    history,
    startNewSession,
    loadSession,
    loading: contextLoading,
    error: contextError,
  } = useContext(SessionContext);

  const handleStartSession = async (e) => {
    e.preventDefault();
    if (!goal.trim() || contextLoading) return;
    setFormError(null);
    try {
      await startNewSession(goal);
    } catch (err) {
      console.error("Failed to create session: ", err);
      setFormError('Failed to start a new session. Please try again.');
    }
  };

  const handleResumeSession = (sessionId) => {
    loadSession(sessionId);
  };

  const StatusBadge = ({ status }) => {
    const statusMap = {
      completed: { icon: CheckCircleIcon, color: 'green', label: 'Completed' },
      running: { icon: ClockIcon, color: 'blue', label: 'Running' },
      new: { icon: PlusIcon, color: 'gray', label: 'New' },
      failed: { icon: ExclamationCircleIcon, color: 'red', label: 'Failed' },
      'data-preparation': { icon: ExclamationCircleIcon, color: 'yellow', label: 'Data Prep' },
      'job-configuration': { icon: ExclamationCircleIcon, color: 'yellow', label: 'Job Config' },
    };

    const { icon: Icon, color, label } = statusMap[status] || statusMap['new'];

    const colors = {
      green: 'bg-green-100 text-green-800',
      blue: 'bg-blue-100 text-blue-800',
      gray: 'bg-gray-100 text-gray-700',
      red: 'bg-red-100 text-red-800',
      yellow: 'bg-yellow-100 text-yellow-800',
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
        <Icon className={`-ml-0.5 mr-1 h-4 w-4 text-${color}-500`} />
        {label}
      </span>
    );
  };
  
  const SessionCard = ({ session }) => (
    <div
      key={session.id}
      onClick={() => handleResumeSession(session.id)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer group"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <p className="text-sm font-medium text-indigo-600">{session.artifacts?.problem_class || 'New Session'}</p>
            <p className="text-lg font-bold text-gray-800 group-hover:text-indigo-700 transition truncate">{session.goal || 'Untitled Session'}</p>
            <p className="text-sm text-gray-500 mt-1">Last updated: {session.updatedAt?.toDate ? session.updatedAt.toDate().toLocaleDateString() : 'N/A'}</p>
          </div>
          <StatusBadge status={session.status} />
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500 font-semibold">Path</p>
              <p className="text-gray-800 flex items-center">{session.artifacts?.recommended_path === 'quantum' ? <BeakerIcon className="h-4 w-4 mr-1 text-purple-500"/> : <CpuChipIcon className="h-4 w-4 mr-1 text-gray-500"/>} {session.artifacts?.recommended_path || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 font-semibold">Solver</p>
              <p className="text-gray-800">{session.artifacts?.mapped_solver || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500 font-semibold">Readiness</p>
              <p className="text-gray-800">{session.artifacts?.readiness_status || '-'}</p>
            </div>
             <div>
              <p className="text-gray-500 font-semibold">Result</p>
              <p className="text-gray-800">{session.artifacts?.result_state || '-'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-2 rounded-b-lg flex items-center justify-end text-sm font-medium text-gray-600 group-hover:text-indigo-600 transition">
        Resume Session <ArrowRightIcon className="ml-2 h-4 w-4"/>
      </div>
    </div>
  );

  const safeHistory = Array.isArray(history) ? history : [];

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header has been removed to be part of the main layout */}

          {/* Start New Analysis Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-10 border border-gray-200">
            <form onSubmit={handleStartSession}>
              <label htmlFor="goal-input" className="block text-xl font-bold text-gray-900 mb-2">Start a New Analysis</label>
              <p className="text-gray-600 mb-4">Describe your goal and let our AI guide you to a quantum-ready solution.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  id="goal-input"
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="E.g., 'Optimize my logistics network for faster delivery times'"
                  className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
                  disabled={contextLoading}
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 disabled:bg-indigo-400 disabled:scale-100 flex items-center justify-center"
                  disabled={!goal.trim() || contextLoading}
                >
                  <PlusIcon className="h-5 w-5 mr-2"/>
                  {contextLoading ? 'Starting...' : 'Start Session'}
                </button>
              </div>
              {formError && <p className="text-red-500 mt-3 text-center sm:text-left">{formError}</p>}
            </form>
          </div>

          {/* Recent Sessions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Sessions</h2>
            {contextLoading && safeHistory.length === 0 ? (
              <LoadingSpinner text="Loading recent sessions..." />
            ) : contextError ? (
              <div className="text-center text-red-600 bg-red-50 p-8 rounded-lg shadow-sm border border-red-200">
                <ExclamationCircleIcon className="h-8 w-8 mx-auto text-red-500 mb-2"/>
                <p className="font-semibold">Error Loading History</p>
                <p className="text-sm">{contextError.message}</p>
              </div>
            ) : safeHistory.length > 0 ? (
              <div className="space-y-6">
                {safeHistory.map((session) => <SessionCard key={session.id} session={session} />)}
              </div>
            ) : (
              <div className="text-center text-gray-500 bg-white p-10 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">No recent sessions found.</h3>
                <p>Start a new analysis to begin your journey from problem to solution.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
