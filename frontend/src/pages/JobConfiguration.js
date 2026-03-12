import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import SessionHeader from '../components/session/SessionHeader';
import SolverDetailsPanel from '../components/job/SolverDetailsPanel';
import DatasetRecap from '../components/job/DatasetRecap';
import ReadinessStatus from '../components/job/ReadinessStatus';
import ParameterEditor from '../components/job/ParameterEditor';
import CodeSnapshotPanel from '../components/job/CodeSnapshotPanel';

function JobConfiguration() {
  const { session, updateSession } = useContext(SessionContext);
  const navigate = useNavigate();
  const { solver, dataset, validation } = session;

  const isReady = validation?.status === 'Success';

  const handleStartExecution = () => {
    if (isReady) {
      updateSession({ status: 'Execution starting...' });
      navigate('/execution');
    }
  };
  
  if (!solver) {
     return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Job Configuration</h2>
        <p className="text-center text-gray-500">
          Please select a solver on the Data Preparation page first.
        </p>
        <div className="mt-6 text-center">
            <Link to="/data" className="text-blue-500 hover:underline">Go to Data Preparation</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SessionHeader />
      <h2 className="text-2xl font-bold mb-4">Job Configuration</h2>
      <p className="mb-6 text-gray-600">Review all settings and parameters before starting the execution. The configuration is based on the selected solver and the prepared data.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <SolverDetailsPanel solver={solver} />
           <ParameterEditor solver={solver} />
           <CodeSnapshotPanel code={solver.code} />
        </div>
        <div className="space-y-6">
          <ReadinessStatus validation={validation} />
          <DatasetRecap dataset={dataset} validation={validation} />
           <div className="bg-white p-4 rounded-lg shadow">
              <button 
                onClick={handleStartExecution}
                disabled={!isReady}
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Approve and Start Execution
              </button>
              {!isReady && <p className="text-xs text-red-500 text-center mt-2">Data validation must be successful before execution.</p>}
            </div>
        </div>
      </div>
    </div>
  );
}

export default JobConfiguration;
