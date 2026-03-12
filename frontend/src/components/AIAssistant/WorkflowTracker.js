import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const stages = [
  { name: 'Define Goal', path: '/chat' },
  { name: 'Prepare Data', path: '/data-preparation' },
  { name: 'Select Method', path: '/job-configuration' }, // Combined Select & Configure for simplicity
  { name: 'Configure Job', path: '/job-configuration' },
  { name: 'Execute', path: '/execution' },
  { name: 'Review Results', path: '/results' },
];

// A helper to map current path to a workflow stage index
const getStageIndex = (pathname) => {
  if (pathname.startsWith('/results')) return 5;
  if (pathname.startsWith('/execution')) return 4;
  if (pathname.startsWith('/job-configuration')) return 3;
  if (pathname.startsWith('/data-preparation')) return 2;
  if (pathname.startsWith('/chat')) return 1;
  return 0; // Dashboard or other
}

const WorkflowTracker = () => {
  const location = useLocation();
  const currentStageIndex = getStageIndex(location.pathname);

  // Filter to unique stages for display
  const uniqueStages = stages.reduce((acc, current) => {
    if (!acc.find((item) => item.name === current.name)) {
      acc.push(current);
    }
    return acc;
  }, []);

  return (
    <div className="mb-6">
      <h3 className="text-md font-semibold mb-3">Workflow Progress</h3>
      <ol className="relative text-sm border-l border-gray-200">
        {uniqueStages.map((stage, index) => {
            const displayIndex = getStageIndex(stage.path);
            const isCompleted = displayIndex < currentStageIndex;
            const isCurrent = displayIndex === currentStageIndex;

            return (
                <li key={stage.name} className="mb-4 ml-4">
                    <div className={`absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-white ${isCurrent ? 'bg-blue-500' : isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <Link to={stage.path} className={`font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-800'}`}>
                        {stage.name}
                    </Link>
                    {isCompleted && <span className="text-xs text-green-600 ml-2">(Completed)</span>}
                </li>
            );
        })}
      </ol>
    </div>
  );
};

export default WorkflowTracker;
