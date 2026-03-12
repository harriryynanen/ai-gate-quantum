import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import ParameterEditor from '../components/job/ParameterEditor';
import CodeSnapshotPanel from '../components/job/CodeSnapshotPanel';
import AIChosenMethod from '../components/job/AIChosenMethod';
import Card from '../components/common/Card';

function JobConfiguration() {
  const { session, updateSession } = useContext(SessionContext);
  const navigate = useNavigate();

  // Mock AI recommendation for now
  const { solver } = {
      solver: {
          id: 'q-risk-001',
          name: "Quantum-inspired Risk Analyzer",
          description: "Uses a quantum-inspired algorithm to find optimal risk distribution.",
          code: `def solve(data):
    # Quantum-inspired optimization logic
    print("Analyzing risk...")
    return {'optimal_risk': 0.42}`
      }
  };

  const handleStartExecution = () => {
    updateSession({ status: 'Execution starting...' });
    // In a real app, this would trigger a backend job
    const newSessionId = `session-${Date.now()}`;
    navigate(`/results/${newSessionId}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Job Configuration</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <AIChosenMethod solver={solver} />
          <ParameterEditor solver={solver} />
          <CodeSnapshotPanel code={solver.code} />
        </div>
        <div className="space-y-6">
          <Card>
            <h3 className="font-bold mb-4">Final Approval</h3>
            <p className="text-sm text-gray-600 mb-4">Review the AI-selected method and parameters. Once approved, the job will be sent for execution.</p>
            <button 
              onClick={handleStartExecution}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700"
            >
              Approve and Start Execution
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default JobConfiguration;
