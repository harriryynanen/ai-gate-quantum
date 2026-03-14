
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { solvers } from '../solverCatalog/solverDefinitions';
import './JobConfiguration.css';

const JobConfiguration = () => {
    const [selectedSolver, setSelectedSolver] = useState(solvers[0].id);
    const [problemInput, setProblemInput] = useState('');
    const navigate = useNavigate();

    const handleStartJob = () => {
        const solver = solvers.find(s => s.id === selectedSolver);
        if (!solver) {
            alert('Selected solver not found!');
            return;
        }

        // --- Mock Job Generation --- //
        // This section simulates generating a job that would be processed by a backend.
        const mockJob = {
            id: `job-${Date.now()}`,
            solverId: solver.id,
            status: 'completed',
            submittedAt: new Date().toISOString(),
            output: generateMockOutput(solver),
        };
        // --- End Mock Job Generation --- //

        // Navigate to the results page, passing the job object in the state
        navigate('/results', { state: { job: mockJob } });
    };

    // This function generates a mock output based on the solver's schema.
    // In a real app, this data would come from the backend after execution.
    const generateMockOutput = (solver) => {
        const baseOutput = {
            status: 'success',
            completedAt: new Date().toISOString(),
            executionTime: Math.random() * 10,
        };

        let result = {};
        switch (solver.id) {
            case 'classical_baseline':
                result = {
                    summary: 'The classical baseline solver found an optimal solution.',
                    objectiveValue: Math.random() * 100,
                    solution: { x: Math.random(), y: Math.random() },
                };
                break;
            case 'linear_regression':
                result = {
                    summary: 'Model fitted with a strong linear relationship.',
                    r_squared: 0.9234 + Math.random() * 0.05,
                    intercept: 1.23 + Math.random() * 0.5,
                    coefficients: [2.05 + Math.random() * 0.2, -0.55 + Math.random() * 0.1],
                };
                break;
            case 'vqe_prototype':
                 result = {
                    summary: 'Placeholder execution for VQE. This is not a real quantum computation.',
                    optimal_value: -1.98 + Math.random() * 0.1,
                    optimal_parameters: [3.14, 1.57, 4.71, 6.28],
                    is_placeholder: true,
                };
                break;
            case 'grover_search':
                result = {
                    summary: 'Grover\'s algorithm finished. Found element: 3',
                    found_element: 3,
                    measurements: { '001': 12, '011': 980, '111': 32 },
                    executed_on: 'qasm_simulator',
                };
                break;
             default:
                result = { summary: 'No mock data available for this solver.' };
        }
        
        return { ...baseOutput, result };
    };

    return (
        <div className="job-config-container">
            <h1>Configure & Start New Job</h1>
            <p>Select a solver and provide the necessary problem definition to begin.</p>

            <div className="config-card">
                <div className="config-section">
                    <label htmlFor="solver-select">1. Choose a Solver</label>
                    <select 
                        id="solver-select" 
                        value={selectedSolver} 
                        onChange={(e) => setSelectedSolver(e.target.value)}
                    >
                        {solvers.map(s => (
                            <option key={s.id} value={s.id} disabled={!s.enabled}>
                                {s.uiLabel} ({s.category}) - {s.maturity}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="config-section">
                    <label htmlFor="problem-input">2. Define Problem Input (JSON format)</label>
                    <textarea 
                        id="problem-input"
                        rows="12"
                        value={problemInput}
                        onChange={(e) => setProblemInput(e.target.value)}
                        placeholder='e.g., { "costs": [[...]], "constraints": [...] }'
                    />
                </div>
                
                <button className="start-job-button" onClick={handleStartJob}>
                    Start Job
                </button>
            </div>

            <div className="info-card">
                <h3>Guidance</h3>
                <p>The system will simulate the execution and generate a result based on the selected solver's output schema. In a real-world scenario, this would trigger a backend process that could take time to complete.</p>
            </div>
        </div>
    );
};

export default JobConfiguration;
