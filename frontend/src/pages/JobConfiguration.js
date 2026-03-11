import React, { useState } from 'react';
import Card from '../components/common/Card';
import SolverParameters from '../components/job/SolverParameters';

function JobConfiguration() {
  const [jobName, setJobName] = useState('New Quantum Simulation');
  const [selectedSolver, setSelectedSolver] = useState('qiskit-vqe');
  const [solverParams, setSolverParams] = useState({});

  const handleParamChange = (params) => {
    setSolverParams(params);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobConfig = {
      name: jobName,
      solver: selectedSolver,
      params: solverParams,
    };
    console.log('Submitting job:', jobConfig);
    // In a real app, you would send this to the backend
    alert('Job submitted! (See console for details)');
  };

  return (
    <div>
      <h2>Job Configuration</h2>
      <Card>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Job Name</label>
            <input
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Solver</label>
            <select
              value={selectedSolver}
              onChange={(e) => setSelectedSolver(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="qiskit-vqe">Qiskit VQE</option>
              <option value="dwave-annealer">DWave Annealer</option>
            </select>
          </div>

          <SolverParameters
            solver={selectedSolver}
            onParamChange={handleParamChange}
          />

          <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Submit Job
          </button>
        </form>
      </Card>
    </div>
  );
}

export default JobConfiguration;
