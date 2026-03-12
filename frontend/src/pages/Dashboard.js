
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getSessions } from '../services/firebaseService';
import { SessionContext } from '../context/SessionContext';

function Dashboard() {
  const [goal, setGoal] = useState('');
  const [recentSessions, setRecentSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use the session context for starting new sessions
  const { startNewSession, loading: sessionLoading } = useContext(SessionContext);

  useEffect(() => {
    setLoading(true);
    getSessions()
      .then(sessions => {
        const sortedSessions = sessions.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
        setRecentSessions(sortedSessions);
      })
      .catch(err => {
        console.error("Error fetching sessions: ", err);
        setError('Failed to load recent sessions.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleStartSession = async (e) => {
    e.preventDefault();
    if (!goal.trim() || sessionLoading) return;

    setError(null);

    try {
      // The context now handles API call, state update, and navigation
      await startNewSession(goal);
    } catch (err) {
      console.error("Failed to create session: ", err);
      setError('Failed to start a new session. Please try again.');
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'new': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="container mx-auto p-8">
        <div className="max-w-4xl mx-auto">
            {/* Header and Goal Input */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-4">QuantumFlow</h1>
                <p className="text-xl text-gray-600">Your AI-Guided Path from Problem to Quantum-Ready Solution.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
                <form onSubmit={handleStartSession}>
                    <label htmlFor="goal-input" className="block text-lg font-medium text-gray-800 mb-2">Start a New Analysis</label>
                    <div className="flex gap-4">
                        <input
                            id="goal-input"
                            type="text"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="E.g., 'Optimize my logistics network for faster delivery times'"
                            className="flex-grow p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                            disabled={sessionLoading}
                        />
                        <button 
                            type="submit" 
                            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100"
                            disabled={!goal.trim() || sessionLoading}
                        >
                            {sessionLoading ? 'Starting...' : 'Start Session'}
                        </button>
                    </div>
                </form>
                 {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>

            {/* Recent Sessions */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Sessions</h2>
                {loading ? (
                    <p className="text-center text-gray-500">Loading recent sessions...</p>
                ) : recentSessions.length > 0 ? (
                    <div className="space-y-4">
                        {recentSessions.map(session => (
                            <Link 
                                to={`/data-preparation?session=${session.id}`}
                                key={session.id}
                                className="block bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-lg text-gray-800">{session.title}</p>
                                        <p className="text-sm text-gray-500">{`Goal: ${session.goal.substring(0, 100)}...`}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(session.status)}`}>
                                            {session.status}
                                        </span>
                                        <p className="text-xs text-gray-400 mt-1">{session.createdAt?.toDate ? session.createdAt.toDate().toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    !error && <p className="text-center text-gray-500 bg-gray-50 p-8 rounded-lg">No recent sessions found. Start a new analysis to begin.</p>
                )}
            </div>
        </div>
    </div>
  );
}

export default Dashboard;
