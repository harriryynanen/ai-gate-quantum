
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const WorkflowLayout = ({ title, description, children, guidance, stage, session, workflowStages }) => {
  const navigate = useNavigate();

  const handleStageClick = (stageKey) => {
    const targetStage = workflowStages.find(s => s.key === stageKey);
    const currentStageIndex = workflowStages.findIndex(s => s.key === stage.key);
    const targetStageIndex = workflowStages.findIndex(s => s.key === stageKey);

    // Allow navigation to completed stages
    if (targetStage && targetStageIndex < currentStageIndex) {
        navigate(`${targetStage.path}?session=${session.id}`);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header and Stage Tracker */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-lg text-gray-600 mt-1">{description}</p>
          
          {/* Workflow Stage Tracker */}
          <div className="mt-6">
            <nav aria-label="Progress">
              <ol role="list" className="flex items-center space-x-2 sm:space-x-4">
                {workflowStages.map((s, index) => {
                  const currentStageIndex = workflowStages.findIndex(ws => ws.key === stage.key);
                  const isCompleted = index < currentStageIndex;
                  const isCurrent = s.key === stage.key;

                  let statusClasses = 'text-gray-500 group-hover:text-gray-700';
                  if (isCurrent) statusClasses = 'text-indigo-600 font-semibold';
                  if (isCompleted) statusClasses = 'text-indigo-600';

                  return (
                    <li key={s.key} className="flex-1">
                      <div 
                        onClick={() => handleStageClick(s.key)}
                        className={`group flex flex-col border-l-4 py-2 pl-4 transition-colors ${isCurrent ? 'border-indigo-600' : (isCompleted ? 'border-indigo-400 hover:border-indigo-600 cursor-pointer' : 'border-gray-200')}`}>
                        <span className={`text-sm font-medium ${statusClasses} transition-colors`}>{s.name}</span>
                        {isCompleted && <CheckCircleIcon className="h-5 w-5 text-indigo-600 mt-1"/>}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>

        {/* Main Content and Guidance Rail */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content area */}
          <main className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {children}
          </main>

          {/* Right-side guidance rail */}
          <aside className="lg:w-96 w-full shrink-0">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 sticky top-8">
              {guidance}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default WorkflowLayout;
