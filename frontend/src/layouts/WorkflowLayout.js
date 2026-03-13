
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const WorkflowLayout = ({ title, description, children, guidance, stage, session, workflowStages }) => {
  const navigate = useNavigate();

  // Safely determine the index of the current stage
  const currentStageIndex = stage && workflowStages 
    ? workflowStages.findIndex(s => s && s.key === stage.key)
    : -1;

  const handleStageClick = (stageKey) => {
    const targetStage = workflowStages.find(s => s.key === stageKey);
    const targetStageIndex = workflowStages.findIndex(s => s.key === stageKey);

    // Allow navigation to completed stages (stages before the current one)
    if (targetStage && currentStageIndex > -1 && targetStageIndex < currentStageIndex) {
        navigate(`${targetStage.path}?session=${session.id}`);
    }
  };
  
  // A fallback for when the stage is not yet determined.
  // This prevents a crash if `stage` is null.
  if (!stage) {
      return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900">{title || 'Loading...'}</h1>
                <p className="text-lg text-gray-600 mt-1">{description || 'Please wait while the session loads.'}</p>
                {/* We can show a disabled-looking progress bar */}
                 <div className="mt-6">
                    <nav aria-label="Progress">
                      <ol role="list" className="flex items-center space-x-2 sm:space-x-4">
                         {workflowStages.map((s) => (
                           <li key={s.key} className="flex-1">
                               <div className="group flex flex-col border-l-4 py-2 pl-4 border-gray-200">
                                   <span className="text-sm font-medium text-gray-500">{s.name}</span>
                               </div>
                           </li>
                         ))}
                      </ol>
                    </nav>
                  </div>

                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                  <main className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    {children}
                  </main>
                  <aside className="lg:w-96 w-full shrink-0">
                      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 sticky top-8">
                        {guidance}
                      </div>
                  </aside>
               </div>
          </div>
        </div>
      );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-lg text-gray-600 mt-1">{description}</p>
          
          <div className="mt-6">
            <nav aria-label="Progress">
              <ol role="list" className="flex items-center space-x-2 sm:space-x-4">
                {(workflowStages || []).map((s, index) => {
                  if (!s) return null; // Defensive check for safety

                  const isCompleted = currentStageIndex > -1 && index < currentStageIndex;
                  const isCurrent = currentStageIndex === index;

                  let statusClasses = 'text-gray-500 group-hover:text-gray-700';
                  let borderClasses = 'border-gray-200';
                  let canClick = false;

                  if (isCurrent) {
                      statusClasses = 'text-indigo-600 font-semibold';
                      borderClasses = 'border-indigo-600';
                  } else if (isCompleted) {
                      statusClasses = 'text-indigo-600';
                      borderClasses = 'border-indigo-400 hover:border-indigo-600 cursor-pointer';
                      canClick = true;
                  }

                  return (
                    <li key={s.key} className="flex-1">
                      <div 
                        onClick={() => canClick && handleStageClick(s.key)}
                        className={`group flex flex-col border-l-4 py-2 pl-4 transition-colors ${borderClasses}`}>
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

        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {children}
          </main>
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
