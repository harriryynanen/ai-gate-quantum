import React from 'react';
import { useLocation } from 'react-router-dom';
import WorkflowTracker from './WorkflowTracker';
import Card from '../common/Card';
import NextStep from './NextStep';
import Recommendation from './Recommendation';

// Mock guidance for each stage
const stageGuidance = {
  dashboard: {
    title: "Welcome Back!",
    why: "This is your starting point. From here, you can start a new analysis or review past work.",
    nextStep: { title: "Start New Analysis", description: "Define a new goal for the AI to tackle.", link: "/chat" },
  },
  chat: {
    title: "Define Your Goal",
    why: "A clear goal helps me select the best tools for your analysis. Tell me what you want to achieve.",
    nextStep: { title: "Prepare Your Data", description: "Once the goal is set, the next step is to upload and validate your data.", link: "/data-preparation" },
  },
  'data-preparation': {
    title: "Data Preparation",
    why: "Correctly formatted data is essential for a successful analysis. Here, we ensure your data matches the requirements of the potential solvers.",
    nextStep: { title: "Select a Method", description: "Based on your data and goals, I will now recommend the best analysis method.", link: "/job-configuration" },
  },
  'job-configuration': {
    title: "Configure Your Job",
    why: "This is the final approval step. Review my recommended method and an alternative, then lock it in to start the execution.",
    nextStep: { title: "Execute Job", description: "Launch the solver and monitor its progress in real-time.", link: "/execution" },
    recommendation: "The Quantum-Inspired Annealer is recommended for its ability to handle complex combinatorial optimization problems, which is a great fit for your stated goal.",
    alternatives: [
      { title: "Classical Solver", description: "A traditional approach. Faster, but may not find the globally optimal solution." },
    ],
  },
  execution: {
    title: "Monitoring Execution",
    why: "The solver is now running. I am monitoring the process for you. No action is needed at this time.",
  },
  results: {
    title: "Review Your Results",
    why: "The analysis is complete. Here are the findings, my interpretation, and your options for what to do next.",
    nextStep: { title: "Explore Another Solution", description: "Start a new session to try an alternative solver on the same problem" },
    recommendation: "The model's confidence is high, and the results align with the initial goals of the analysis.",
    alternatives: [ {title: "Download Results", description: "Export the raw data from the simulation"} ],
    blocked: "You cannot select a new solver at this stage. To do that, you must start a new analysis session.",
  },
};

const getPageKey = (pathname) => {
  if (pathname.startsWith('/results')) return 'results';
  if (pathname.startsWith('/execution')) return 'execution';
  if (pathname.startsWith('/job-configuration')) return 'job-configuration';
  if (pathname.startsWith('/data-preparation')) return 'data-preparation';
  if (pathname.startsWith('/chat')) return 'chat';
  return 'dashboard';
}

const AIAssistantPanel = () => {
  const location = useLocation();
  const pageKey = getPageKey(location.pathname);
  const guidance = stageGuidance[pageKey];

  return (
    <div className="bg-gray-50 h-full flex flex-col border-l border-gray-200 p-4">
      <WorkflowTracker />
      
      <div className="flex-grow overflow-y-auto space-y-4">
        <h3 className="font-bold text-lg">{guidance.title}</h3>
        
        <Card>
          <h4 className="font-semibold text-md mb-2">Why this stage matters:</h4>
          <p className="text-sm text-gray-700">{guidance.why}</p>
        </Card>

        {guidance.nextStep && <NextStep step={guidance.nextStep} />}
        
        {guidance.recommendation && <Recommendation recommendation={guidance.recommendation} />}

        {guidance.alternatives && (
            <div>
                <h4 className="font-semibold text-md mb-2 mt-4">Alternative Options</h4>
                <div className="space-y-2">
                    {guidance.alternatives.map(alt => <Card key={alt.title}><p className="text-sm"><b>{alt.title}:</b> {alt.description}</p></Card>)}
                </div>
            </div>
        )}

        {guidance.blocked && (
          <Card>
            <h4 className="font-bold text-md">Blocked Actions</h4>
            <p className="text-sm text-gray-600 mt-1">{guidance.blocked}</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIAssistantPanel;
