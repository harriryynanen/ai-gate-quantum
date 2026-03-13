
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext.js';
import { WORKFLOW_STAGES, STAGE_CONFIG } from '../workflow/stages.js';
import WorkflowLayout from '../layouts/WorkflowLayout.js';
import LoadingSpinner from '../components/common/LoadingSpinner.js';
import { LightBulbIcon, ClockIcon, CheckCircleIcon, PlayIcon, ArrowRightIcon, BeakerIcon, CpuChipIcon, XCircleIcon } from '@heroicons/react/24/solid';

// Reusable UI Components
const InfoCard = ({ title, children, className }) => (
    <div className={`bg-gray-50 rounded-lg p-4 border border-gray-200 ${className}`}>
        <h3 className="text-md font-semibold text-gray-700 mb-2">{title}</h3>
        <div className="text-sm text-gray-600 space-y-1">
            {children}
        </div>
    </div>
);

// Main Content Components
const ExecutionStatus = ({ status }) => {
    const statusMap = {
        pending: { icon: ClockIcon, color: 'yellow', label: 'Pending' },
        running: { icon: PlayIcon, color: 'blue', label: 'Running' },
        completed: { icon: CheckCircleIcon, color: 'green', label: 'Completed' },
        failed: { icon: XCircleIcon, color: 'red', label: 'Failed' },
    };
    const { icon: Icon, color, label } = statusMap[status] || statusMap.pending;

    return (
        <div className={`text-center p-8 rounded-lg border-2 border-${color}-500 bg-${color}-50`}>
            <Icon className={`h-12 w-12 text-${color}-500 mx-auto mb-4`} />
            <h2 className={`text-2xl font-bold text-${color}-800`}>{label}</h2>
            <p className={`text-${color}-700`}>The job is currently {label.toLowerCase()}.</p>
        </div>
    );
};

const LogViewer = ({ logs }) => (
    <div className="bg-gray-900 text-white font-mono text-sm rounded-lg shadow-inner p-6 h-96 overflow-y-auto mt-6 border border-gray-700">
        <pre>
        {!logs || logs.length === 0 ? (
            <span className="text-gray-400">Awaiting execution logs...</span>
        ) : (
            logs.map((log, index) => (
                <div key={index} className="flex items-start">
                    <span className="text-gray-500 mr-4 w-24">{log.timestamp?.seconds ? new Date(log.timestamp.seconds * 1000).toLocaleTimeString() : '--:--:--'}</span>
                    <span className="flex-1">{log.message}</span>
                </div>
            ))
        )}
        </pre>
    </div>
);

const JobDetails = ({ solver, execution }) => (
    <InfoCard title="Job Details">
        <p><strong>Solver:</strong> {solver.name} ({solver.type})</p>
        <p><strong>Execution Mode:</strong> {execution?.mode || 'N/A'}</p>
        <p><strong>Job ID:</strong> {execution?.jobId || 'N/A'}</p>
        <p><strong>Submitted:</strong> {execution?.submittedAt?.toDate ? execution.submittedAt.toDate().toLocaleString() : 'N/A'}</p>
    </InfoCard>
);

// Guidance Rail Component
const GuidanceRail = ({ session, execution, updateSession }) => {
    const isComplete = execution?.status === 'completed';

    const handleNextStep = () => {
        if (!session || !isComplete) return;
        updateSession(session.id, WORKFLOW_STAGES.REVIEW_RESULTS);
    };
    
    return (
        <div>
            <div className="flex items-center text-lg font-bold text-gray-900 mb-4">
                <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
                <span>AI Guidance</span>
            </div>
            <div className="space-y-4">
                <InfoCard title="Why this Matters">
                    <p>This is where the prepared problem is sent to a computational resource. For this POC, we are using simulated backends, which mimic the behavior of real hardware. This step produces the raw data for the final analysis.</p>
                </InfoCard>
                <InfoCard title="What's Happening">
                    <ul className="list-disc list-inside">
                        <li className={execution?.status === 'pending' ? 'font-bold' : ''}>Job submitted to queue.</li>
                        <li className={execution?.status === 'running' ? 'font-bold' : ''}>Resource allocated and job is running.</li>
                        <li className={execution?.status === 'completed' ? 'font-bold' : ''}>Execution finished, results are stored.</li>
                    </ul>
                </InfoCard>
                <div className="mt-6">
                    <button 
                        onClick={handleNextStep}
                        disabled={!isComplete}
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
                    >
                        View Results
                        <ArrowRightIcon className="ml-2 h-5 w-5"/>
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-2">
                        {isComplete ? 'Execution is complete. Proceed to review the results.' : 'Please wait for the execution to complete.'}
                    </p>
                </div>
            </div>
        </div>
    );
};


// Main Page Component
function Execution() {
    const navigate = useNavigate();
    const {
        session,
        artifacts,
        loading,
        error,
        currentStageConfig,
        updateSession
    } = useContext(SessionContext);

    const stage = currentStageConfig || STAGE_CONFIG[WORKFLOW_STAGES.EXECUTE];

    const workflowStages = Object.keys(STAGE_CONFIG).map(key => ({ key, ...STAGE_CONFIG[key] }));

    // Redirect if execution is complete
    useEffect(() => {
        if (session?.currentStage === WORKFLOW_STAGES.REVIEW_RESULTS) {
            const resultsPath = STAGE_CONFIG[WORKFLOW_STAGES.REVIEW_RESULTS].path;
            navigate(`${resultsPath}?session=${session.id}`);
        }
    }, [session, navigate]);

    const renderMainContent = () => {
        if (loading && !artifacts.execution) return <LoadingSpinner text="Initializing execution environment..." />;
        if (error) return <p className="text-red-500 text-center p-8">{`Error: ${error.message}`}</p>;
        if (!session || !artifacts.recommendation) return <p className="text-gray-500 text-center p-8">Job configuration not found. Please return to a previous step.</p>;
        
        const execution = artifacts.execution || { status: 'pending', logs: [] };

        return (
            <>
                <ExecutionStatus status={execution.status} />
                <LogViewer logs={execution.logs} />
            </>
        );
    };
    
    const renderGuidance = () => {
        if (loading || error || !session) return null;
        return (
            <div className="space-y-6">
                <JobDetails solver={artifacts.recommendation.mappedSolver} execution={artifacts.execution} />
                <GuidanceRail session={session} execution={artifacts.execution} updateSession={updateSession} />
            </div>
        );
    }

    return (
        <WorkflowLayout 
            title={stage?.name || 'Loading...'}
            description={stage?.description || ''}
            guidance={renderGuidance()}
            stage={stage}
            session={session}
            workflowStages={workflowStages}
        >
            {renderMainContent()}
        </WorkflowLayout>
    );
}

export default Execution;
