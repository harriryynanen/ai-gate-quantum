
import React, { useContext } from 'react';
import { SessionContext } from '../context/SessionContext.js';
import { WORKFLOW_STAGES, STAGE_CONFIG } from '../workflow/stages.js';
import WorkflowLayout from '../layouts/WorkflowLayout.js';
import LoadingSpinner from '../components/common/LoadingSpinner.js';
import { LightBulbIcon, CheckCircleIcon, XCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { BeakerIcon, CpuChipIcon } from '@heroicons/react/24/outline';

// Reusable UI Components for this page
const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">{title}</h2>
    {children}
  </div>
);

const InfoCard = ({ title, children }) => (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="text-md font-semibold text-gray-700 mb-2">{title}</h3>
        <div className="text-sm text-gray-600 space-y-2">
            {children}
        </div>
    </div>
);

// Main Content Components
const ProblemFormulation = ({ formulation }) => {
  if (!formulation) return <p className="text-gray-500">Waiting for AI to interpret the problem...</p>;
  
  return (
    <Section title="Interpreted Problem Statement">
      <div className="space-y-4">
        <InfoCard title="Objective">
          <p>{formulation.objective}</p>
        </InfoCard>
        {formulation.constraints?.length > 0 && (
          <InfoCard title="Constraints">
            <ul className="list-disc list-inside">
              {formulation.constraints.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </InfoCard>
        )}
      </div>
    </Section>
  );
};

const ReadinessAssessment = ({ recommendation }) => {
    if (!recommendation) return <p className="text-gray-500">Assessing readiness for quantum and classical paths...</p>;

    const { readinessStatus, readinessChecks } = recommendation;
    const isReady = readinessStatus === 'ready';

    return (
        <Section title="Path Readiness">
             <div className={`p-4 rounded-lg border ${isReady ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                <div className="flex items-center">
                    {isReady ? <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3"/> : <XCircleIcon className="h-6 w-6 text-yellow-500 mr-3"/>}
                    <h3 className="text-lg font-bold">{isReady ? 'Ready for Next Stage' : 'Inputs Required'}</h3>
                </div>
                <ul className="mt-3 list-disc list-inside pl-2 text-sm">
                    {readinessChecks.map((check, index) => (
                        <li key={index} className={`flex items-center ${check.status === 'pass' ? 'text-gray-700' : 'text-yellow-800 font-semibold'}`}>
                           {check.status === 'pass' 
                             ? <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2"/>
                             : <XCircleIcon className="h-4 w-4 text-yellow-500 mr-2"/>
                           }
                           {check.message}
                        </li>
                    ))}
                </ul>
            </div>
        </Section>
    );
};

const RecommendationPath = ({ recommendation }) => {
    if (!recommendation) return null;

    const { recommendedPath, justification, mappedSolver, alternativePath } = recommendation;
    const isQuantum = recommendedPath === 'quantum';

    return (
        <Section title="AI Recommendation">
            <div className="border-2 border-indigo-600 rounded-lg bg-indigo-50 p-6 shadow-md">
                <div className="flex items-center mb-3">
                    {isQuantum ? <BeakerIcon className="h-8 w-8 text-indigo-600 mr-3"/> : <CpuChipIcon className="h-8 w-8 text-indigo-600 mr-3"/>}
                    <div>
                        <p className="text-sm font-semibold text-indigo-700">Recommended Path</p>
                        <h3 className="text-2xl font-bold text-gray-900 capitalize">{recommendedPath}</h3>
                    </div>
                </div>
                <InfoCard title="Why this path?">
                    <p>{justification}</p>
                </InfoCard>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <InfoCard title="Mapped Solver">
                        <p className="font-semibold">{mappedSolver.name} <span className="text-xs font-light">({mappedSolver.type})</span></p>
                    </InfoCard>
                    <InfoCard title="Alternative Path">
                        <p className="capitalize">{alternativePath}</p>
                    </InfoCard>
                </div>
            </div>
        </Section>
    );
};


// Guidance Rail Component
const GuidanceRail = ({ session, artifacts, updateSession }) => {
    const { formulation, recommendation } = artifacts;
    const isReadyForNext = recommendation?.readinessStatus === 'ready';

    const handleNextStep = () => {
        if (!session || !isReadyForNext) return;
        updateSession(session.id, WORKFLOW_STAGES.PREPARE_SOLVER_INPUT);
    };
    
    return (
        <div>
            <div className="flex items-center text-lg font-bold text-gray-900 mb-4">
                <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
                <span>AI Guidance</span>
            </div>
            
            <div className="space-y-4">
                <InfoCard title="Why this Matters">
                    <p>This stage helps translate your high-level goal into a structured problem that a classical or quantum solver can understand. A clear formulation is the most critical step for a meaningful result.</p>
                </InfoCard>

                <InfoCard title="What's Happening">
                    <ul className="list-disc list-inside">
                        <li className={formulation ? 'text-green-600' : 'text-gray-600'}>
                           {formulation ? 'Interpreted your goal' : 'Interpreting your goal...'}
                        </li>
                        <li className={recommendation ? 'text-green-600' : 'text-gray-600'}>
                           {recommendation ? 'Assessed readiness & recommended a path' : 'Assessing readiness...'}
                        </li>
                    </ul>
                </InfoCard>

                {!isReadyForNext && recommendation && (
                    <InfoCard title="What is Missing">
                        <p className="font-semibold text-yellow-800">Your problem requires more specific inputs before we can proceed.</p>
                        <p>Please review the readiness checks and provide the necessary data or clarifications.</p>
                    </InfoCard>
                )}
                
                <div className="mt-6">
                    <button 
                        onClick={handleNextStep}
                        disabled={!isReadyForNext}
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
                    >
                        {isReadyForNext ? 'Proceed to Job Configuration' : 'Awaiting Inputs'}
                        <ArrowRightIcon className="ml-2 h-5 w-5"/>
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-2">The next step will prepare the specific inputs required by the <span className="font-semibold">{recommendation?.mappedSolver.name || 'selected solver'}</span>.</p>
                </div>
            </div>
        </div>
    );
};

// Main Page Component
function DataPreparation() {
  const {
    session,
    artifacts,
    loading,
    error,
    currentStageConfig,
    updateSession
  } = useContext(SessionContext);

  const stage = currentStageConfig || STAGE_CONFIG.problem_formulation;

  const workflowStages = Object.keys(STAGE_CONFIG).map(key => ({
      key,
      ...STAGE_CONFIG[key]
  }));

  const renderMainContent = () => {
    if (loading && !session) return <LoadingSpinner text="Loading session artifacts..." />;
    if (error) return <p className="text-red-500 text-center p-8">{`Error: ${error.message}`}</p>;
    if (!session) return <p className="text-gray-500 text-center p-8">No active session. Please start one from the dashboard.</p>;

    const { formulation, recommendation } = artifacts;

    return (
        <>
            <ProblemFormulation formulation={formulation} />
            <ReadinessAssessment recommendation={recommendation} />
            <RecommendationPath recommendation={recommendation} />
        </>
    );
  };
  
  const renderGuidance = () => {
      if (loading || error || !session) return null;
      return <GuidanceRail session={session} artifacts={artifacts} updateSession={updateSession} />;
  }

  return (
    <WorkflowLayout 
      title={stage.name}
      description={stage.description}
      guidance={renderGuidance()}
      stage={stage}
      session={session}
      workflowStages={workflowStages}
    >
      {renderMainContent()}
    </WorkflowLayout>
  );
}

export default DataPreparation;
