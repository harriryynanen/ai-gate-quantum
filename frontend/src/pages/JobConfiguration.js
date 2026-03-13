
import React, { useContext } from 'react';
import { SessionContext } from '../context/SessionContext.js';
import { WORKFLOW_STAGES, STAGE_CONFIG } from '../workflow/stages.js';
import WorkflowLayout from '../layouts/WorkflowLayout.js';
import LoadingSpinner from '../components/common/LoadingSpinner.js';
import { LightBulbIcon, CheckCircleIcon, XCircleIcon, ArrowRightIcon, BeakerIcon, CpuChipIcon } from '@heroicons/react/24/solid';

// Reusable UI Components
const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const InfoCard = ({ title, children, className }) => (
    <div className={`bg-gray-50 rounded-lg p-4 border border-gray-200 ${className}`}>
        <h3 className="text-md font-semibold text-gray-700 mb-2">{title}</h3>
        <div className="text-sm text-gray-600 space-y-2">
            {children}
        </div>
    </div>
);

const CodeBlock = ({ code }) => (
  <pre className="bg-gray-800 text-white p-4 rounded-lg text-sm overflow-x-auto">
    <code>{JSON.stringify(code, null, 2)}</code>
  </pre>
);

// Main Content Components
const SolverDetailsCard = ({ solver }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center">
            {solver.type === 'quantum' ? <BeakerIcon className="h-8 w-8 text-indigo-600 mr-4"/> : <CpuChipIcon className="h-8 w-8 text-indigo-600 mr-4"/>}
            <div>
                <p className="text-sm font-semibold text-indigo-600">Selected Solver</p>
                <h2 className="text-2xl font-bold text-gray-900">{solver.name}</h2>
                <p className="text-gray-600">{solver.description}</p>
            </div>
        </div>
    </div>
);

const InputSection = ({ title, data, isCode = false }) => (
    <InfoCard title={title}>
        {isCode ? <CodeBlock code={data} /> : <p className="text-gray-800 whitespace-pre-wrap">{data}</p>}
    </InfoCard>
);

const ReadinessStatus = ({ status, missingFields }) => {
    const isReady = status === 'ready';
    return (
        <div className={`p-4 rounded-lg border ${isReady ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <div className="flex items-center">
                {isReady ? <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3"/> : <XCircleIcon className="h-6 w-6 text-yellow-500 mr-3"/>}
                <h3 className="text-lg font-bold">{isReady ? 'Ready for Execution' : 'Missing Required Fields'}</h3>
            </div>
            {!isReady && (
                <ul className="mt-3 list-disc list-inside pl-2 text-sm text-yellow-800 font-semibold">
                    {missingFields.map(field => <li key={field}>{`Missing: ${field}`}</li>)}
                </ul>
            )}
        </div>
    );
};

// Guidance Rail Component
const GuidanceRail = ({ session, solverInput, updateSession }) => {
    const isReadyForNext = solverInput?.readinessStatus === 'ready';

    const handleNextStep = () => {
        if (!session || !isReadyForNext) return;
        updateSession(session.id, WORKFLOW_STAGES.EXECUTE);
    };
    
    return (
        <div>
            <div className="flex items-center text-lg font-bold text-gray-900 mb-4">
                <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
                <span>AI Guidance</span>
            </div>
            <div className="space-y-4">
                <InfoCard title="Why this Matters">
                    <p>This stage translates the abstract problem from the previous step into the specific data structures and formats that the selected solver requires. Every solver has a unique 'contract', and this step ensures we meet it perfectly.</p>
                </InfoCard>
                <InfoCard title="What's Happening">
                    <p>The system is encoding your objective, constraints, and variables into a {solverInput?.metadata.format || 'standard model'} that the <strong>{solverInput?.metadata.solverName}</strong> can process.</p>
                </InfoCard>
                {solverInput && <ReadinessStatus status={solverInput.readinessStatus} missingFields={solverInput.missingFields || []} />}
                <div className="mt-6">
                    <button 
                        onClick={handleNextStep}
                        disabled={!isReadyForNext}
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
                    >
                        Proceed to Execution
                        <ArrowRightIcon className="ml-2 h-5 w-5"/>
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-2">The next step will submit this prepared job to the execution environment.</p>
                </div>
            </div>
        </div>
    );
};

// Main Page Component
function JobConfiguration() {
  const {
    session,
    artifacts,
    loading,
    error,
    currentStageConfig,
    updateSession
  } = useContext(SessionContext);

  const stage = currentStageConfig || STAGE_CONFIG[WORKFLOW_STAGES.PREPARE_SOLVER_INPUT];

  const workflowStages = Object.keys(STAGE_CONFIG).map(key => ({ key, ...STAGE_CONFIG[key] }));

  const renderMainContent = () => {
    if (loading && !artifacts.solverInput) return <LoadingSpinner text="Preparing solver inputs..." />;
    if (error) return <p className="text-red-500 text-center p-8">{`Error: ${error.message}`}</p>;
    if (!session || !artifacts.solverInput || !artifacts.recommendation) return <p className="text-gray-500 text-center p-8">Solver inputs not yet prepared. Return to the previous stage.</p>;

    const { solverInput, recommendation } = artifacts;
    const { mappedSolver } = recommendation;

    return (
      <>
        <SolverDetailsCard solver={mappedSolver} />
        <Section title="Solver Input Preparation">
            <p className="text-sm text-gray-600 mb-4">The following inputs have been constructed based on the solver's contract. The execution environment will receive this exact payload.</p>
            {Object.entries(solverInput.preparedData).map(([key, value]) => (
                <InputSection 
                    key={key} 
                    title={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                    data={value}
                    isCode={typeof value === 'object'}
                />
            ))}
        </Section>
      </>
    );
  };
  
  const renderGuidance = () => {
      if (loading || error || !session) return null;
      return <GuidanceRail session={session} solverInput={artifacts.solverInput} updateSession={updateSession} />;
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

export default JobConfiguration;
