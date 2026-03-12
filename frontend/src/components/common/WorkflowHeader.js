import React from 'react';
import { useLocation } from 'react-router-dom';

const stageTitles = {
  '/chat': 'AI Chat Workspace',
  '/data': 'Data Preparation',
  '/config': 'Job Configuration',
  '/execution': 'Execution Monitor',
  '/results': 'Results',
};

const WorkflowHeader = ({ sessionId }) => {
  const location = useLocation();
  const currentStage = stageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="p-4 bg-gray-800 text-white rounded-t-lg mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">AI-Guided Analysis</h1>
          <p className="text-sm opacity-80">Current Stage: {currentStage}</p>
        </div>
        <div>
          <p className="text-sm opacity-80">Session ID: {sessionId}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowHeader;