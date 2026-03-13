
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import SolverResultsRenderer from '../components/results/SolverResultsRenderer';
import ChatSidePanel from '../components/chat/ChatSidePanel';
import StatusIndicator from '../components/common/StatusIndicator';
import { DocumentPlusIcon, ClockIcon, ExclamationTriangleIcon, LightBulbIcon, ScaleIcon } from '@heroicons/react/24/outline';

const NextSteps = ({ onNewSession }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <button 
                    onClick={onNewSession} 
                    className="flex-1 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center"
                >
                    <DocumentPlusIcon className="h-5 w-5 mr-2" /> Start New Analysis
                </button>
                <button 
                    onClick={() => navigate('/history')} 
                    className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
                >
                    <ClockIcon className="h-5 w-5 mr-2"/> View History
                </button>
            </div>
        </div>
    );
}

const ComparisonSection = ({ comparison }) => {
    if (!comparison) return null;
    return (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ScaleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-bold text-blue-800">Comparison & Context</p>
                    <p className="text-sm text-blue-700 mt-1"><b>Recommended Path:</b> {comparison.recommendedPath}</p>
                    <p className="text-sm text-blue-700"><b>Alternative Path:</b> {comparison.alternativePath}</p>
                    <p className="text-sm text-blue-700 mt-2"><b>Reasoning:</b> {comparison.reasoning}</p>
                    <p className="text-xs text-gray-600 mt-2"><b>Baseline Used:</b> {comparison.baselineUsed}</p>
                </div>
            </div>
        </div>
    );
};

const InterpretationGuardrails = ({ guardrails }) => {
    if (!guardrails || guardrails.length === 0) return null;
    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-bold text-yellow-800">Interpretation Guardrails</p>
                    <ul className="list-disc list-inside mt-2 text-sm text-yellow-700">
                        {guardrails.map((note, index) => <li key={index}>{note}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const ExecutionNarrative = ({ narrative }) => {
    if (!narrative) return null;
    return (
        <div className="bg-gray-100 p-4 my-4 rounded-lg">
             <div className="flex">
                <div className="flex-shrink-0">
                    <LightBulbIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-bold text-gray-800">Execution Narrative</p>
                    <p className="text-sm text-gray-700 mt-1">{narrative}</p>
                </div>
            </div>
        </div>
    );
};

function Results() {
  const navigate = useNavigate();
  const { session, execution, loading, error, startNewSession } = useContext(SessionContext);
  
  // Assuming 'execution' contains the full result payload as per the new model
  const results = execution?.results; 

  const handleNewSession = async () => {
      try {
          await startNewSession("New analysis from results page");
      } catch (err) {
          console.error("Failed to start a new session", err);
      }
  };

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading results...</div>;
  }

  if (error) {
     return <div className="container mx-auto p-8 text-center text-red-500">Error: {error.message}</div>;
  }

  if (!session) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">No active session found.</h1>
        <p className="text-gray-600">Please start a new job or select one from your history.</p>
        <button onClick={() => navigate('/')} className="mt-6 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
          Go to Dashboard
        </button>
      </div>
    );
  }

  if (!execution) {
    return (
        <div className="container mx-auto p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Execution Not Found</h1>
            <p className="text-gray-600">No execution data is available for this session.</p>
            <button onClick={() => navigate(`/job-configuration?session=${session.id}`)} className="mt-6 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
                Go to Job Configuration
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
                    <p className="text-md text-gray-600">Session: {session.goal || session.id}</p>
                </div>
                <StatusIndicator status={execution.status || 'completed'} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {/* Main result interpretation */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-2">Summary</h2>
                        <p className="text-gray-700 mb-4">{results?.summary ?? 'No summary available.'}</p>
                        <h3 className="text-xl font-bold mb-2">Interpretation</h3>
                        <p className="text-gray-700">{results?.interpretation ?? 'No interpretation available.'}</p>
                    </div>
                    
                    {/* Comparison and Guardrails */}
                    <ComparisonSection comparison={results?.comparisonBaseline} />
                    <InterpretationGuardrails guardrails={results?.transparencyNotes?.guardrails} />

                    {/* Solver-specific breakdown */}
                    <SolverResultsRenderer execution={execution} />
                    
                    {/* Execution Narrative */}
                    <ExecutionNarrative narrative={results?.transparencyNotes?.executionNarrative} />

                    <NextSteps onNewSession={handleNewSession} />
                </div>
                <div className="lg:col-span-1">
                    <ChatSidePanel context={{ session, execution }} />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Results;
