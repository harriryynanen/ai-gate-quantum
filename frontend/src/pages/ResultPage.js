import React from 'react';
import { useLocation } from 'react-router-dom';
import './ResultPage.css'; // New CSS for the result page layout

// Mock data fetching based on jobId
const getJobResult = (jobId) => {
  if (jobId === 'job-122') {
    return {
      id: 'job-122',
      name: 'VQE Ground State',
      summary: 'The simulation found the ground state energy for the given molecule.',
      executionDetails: {
        solver: 'Variational Quantum Eigensolver',
        timestamp: '2023-10-26T14:30:00Z',
        duration: '15m 32s',
      },
      results: {
        energy: -1.137, // Example result
        optimizer_path: [/*...data...*/]
      },
      raw_logs: 'Executing VQE...\nOptimizer converged after 120 iterations...\nFinal energy: -1.137 Ha'
    };
  }
  return { id: 'N/A', name: 'Unknown Job', summary: '', executionDetails: {}, results: {}, raw_logs: '' };
};

const ResultPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const jobId = params.get('jobId');

  const result = getJobResult(jobId);

  return (
    <div className="result-page">
      <div className="result-header">
        <h1>Results for Job: {result.name}</h1>
        <p>ID: {result.id}</p>
      </div>

      <div className="result-layout">
        <div className="main-content">
          <section>
            <h2>Execution Summary</h2>
            <p>{result.summary}</p>
            <ul>
              <li><strong>Solver:</strong> {result.executionDetails.solver}</li>
              <li><strong>Completed:</strong> {new Date(result.executionDetails.timestamp).toLocaleString()}</li>
              <li><strong>Duration:</strong> {result.executionDetails.duration}</li>
            </ul>
          </section>
          
          <section>
            <h2>Result Data</h2>
            <pre>{JSON.stringify(result.results, null, 2)}</pre>
          </section>
        </div>

        <div className="side-panel">
          <section>
            <h2>Logs</h2>
            <pre className="logs">{result.raw_logs}</pre>
          </section>

          <section>
            <h2>AI Interpretation</h2>
            <div className="ai-interpretation">
              <p>The VQE algorithm successfully converged, indicating a stable ground state was found. The final energy of -1.137 Ha is consistent with theoretical predictions for this molecular configuration.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
