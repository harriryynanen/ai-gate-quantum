
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import { api } from '../services/api';
import { SolverInputCard } from '../components/job/SolverInputCard';
import StatusIndicator from '../components/common/StatusIndicator';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/solid';

const LogViewer = ({ logs }) => (
    <div className="bg-gray-900 text-white font-mono text-sm rounded-lg shadow-lg p-6 h-96 overflow-y-auto mt-6">
        {!logs || logs.length === 0 ? (
            <p className="text-gray-400">Awaiting execution logs...</p>
        ) : (
            logs.map((log, index) => (
                <div key={index} className="flex items-start">
                    <span className="text-gray-500 mr-4">{new Date(log.timestamp.seconds * 1000).toLocaleTimeString()}</span>
                    <p className="flex-1">{log.message}</p>
                </div>
            ))
        )}
    </div>
);

function Execution() {
    const navigate = useNavigate();
    const { session, solverInputContract, execution, loading } = useContext(SessionContext);
    const [error, setError] = useState('');
    const [isStarting, setIsStarting] = useState(false);

    // Redirect to results when execution is complete
    useEffect(() => {
        if (execution?.status === 'completed' || execution?.status === 'failed') {
            const timer = setTimeout(() => {
                navigate(`/results?session=${session?.id}`);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [execution, navigate, session?.id]);

    const handleStartExecution = async () => {
        if (!session || !solverInputContract) return;
        setIsStarting(true);
        setError('');
        try {
            await api.startExecution(session.id, solverInputContract.id);
            // The context listener will pick up the new execution document
        } catch (err) { 
            console.error("Failed to start execution:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsStarting(false);
        }
    };

    if (loading && !solverInputContract) {
        return <div className="container mx-auto p-8 text-center">Loading execution configuration...</div>;
    }

    if (!solverInputContract) {
        return <div className="container mx-auto p-8 text-center">This job is not yet configured for execution. Please return to the configuration page.</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <div className="max-w-4xl mx-auto">
                {!execution ? (
                    <h1 className="text-4xl font-bold mb-4">Ready for Execution</h1>
                ) : (
                    <h1 className="text-4xl font-bold mb-4">Execution Monitor</h1>
                )}
                
                <p className="text-lg text-gray-600 mb-8">
                    {!execution 
                        ? "Review the final solver input contract below. When you are ready, start the execution."
                        : "The job is now running. You can monitor its progress and logs in real-time below."
                    }
                </p>

                <SolverInputCard contract={solverInputContract} />
                
                {error && <div className="my-4 p-4 bg-red-100 text-red-800 rounded-lg"><strong>Error:</strong> {error}</div>}
                
                {/* Execution Control and Status */}
                <div className="mt-8 text-center">
                    {!execution ? (
                        <button 
                            onClick={handleStartExecution}
                            disabled={isStarting || solverInputContract.readinessStatus !== 'ready'}
                            className="bg-green-600 text-white font-bold py-4 px-10 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                        >
                            {isStarting ? ( "Starting..." ) : ( <><PlayIcon className="h-6 w-6 mr-2" /> Start Execution</> )}
                        </button>
                    ) : (
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl font-semibold mb-2">Execution Status</h3>
                            <StatusIndicator status={execution.status} />
                        </div>
                    )}
                </div>

                {execution && <LogViewer logs={execution.logs} />}

            </div>
        </div>
    );
}

export default Execution;
