
import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import SolverResultsRenderer from '../components/results/SolverResultsRenderer';
import ChatSidePanel from '../components/chat/ChatSidePanel';
import StatusIndicator from '../components/common/StatusIndicator';
import { ArrowUturnLeftIcon, DocumentPlusIcon, ClockIcon } from '@heroicons/react/24/outline';

const NextSteps = ({ onNewSession }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <button onClick={onNewSession} className="flex-1 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center">
                    <DocumentPlusIcon className="h-5 w-5 mr-2" /> Start New Analysis
                </button>
                <button onClick={() => navigate('/history')} className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition flex items-center justify-center">
                    <ClockIcon className="h-5 w-5 mr-2"/> View History
                </button>
            </div>
        </div>
    );
}

function Results() {
  const navigate = useNavigate();
  const { session, execution, loading, error, startNewSession, setActiveSession } = useContext(SessionContext);
  const location = useLocation();

  // When navigating directly to this page, ensure the correct session is active.
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionIdFromUrl = searchParams.get('session');
    if (sessionIdFromUrl && (!session || session.id !== sessionIdFromUrl)) {
      setActiveSession(sessionIdFromUrl);
    }
  }, [location.search, session, setActiveSession]);

  const handleNewSession = async () => {
      try {
          const { sessionId } = await startNewSession("New analysis from results");
          navigate(`/job-configuration?session=${sessionId}`);
      } catch (error) {
          console.error("Failed to start a new session", error);
      }
  };

  if (loading || !execution) {
    return <div className="container mx-auto p-8 text-center">Loading results...</div>;
  }

  if (error) {
     return <div className="container mx-auto p-8 text-center text-red-500">Error: {error}</div>;
  }

  if (!session) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">No active session found.</h1>
        <p>Please start a new job or select one from your history.</p>
        <button onClick={() => navigate('/')} className="mt-4 bg-indigo-500 text-white font-bold py-2 px-4 rounded">
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto p-4 sm:p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-bold">Analysis Results</h1>
                    <p className="text-md text-gray-600">For session: {session.title}</p>
                </div>
                {execution && <StatusIndicator status={execution.status} />}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <SolverResultsRenderer execution={execution} />
                    <NextSteps onNewSession={handleNewSession} />
                </div>
                <div className="lg:col-span-1">
                    <ChatSidePanel execution={execution} />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Results;
