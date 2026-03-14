
import React from 'react';
import { useLocation } from 'react-router-dom';
import { solvers } from '../solverCatalog/solverDefinitions';
import ClassicalResult from '../components/results/ClassicalResult';
import HybridResult from '../components/results/HybridResult';
import QuantumResult from '../components/results/QuantumResult';
import './Results.css';

const Results = () => {
    const location = useLocation();
    const { job } = location.state || {};

    if (!job) {
        return <div className="results-container">No job data provided. Please go back and start a new job.</div>;
    }

    const solver = solvers.find(s => s.id === job.solverId);
    const { result, status, completedAt } = job.output;

    const renderResultBody = () => {
        if (!result) return <div className="result-body-error">No result data was returned from the solver.</div>;
        
        switch (solver?.category) {
            case 'classical':
                return <ClassicalResult solverId={solver.id} result={result} />;
            case 'hybrid':
                return <HybridResult solverId={solver.id} result={result} />;
            case 'quantum':
                return <QuantumResult solverId={solver.id} result={result} />;
            default:
                return <div className="result-body-error">Could not render result: Unknown solver category.</div>;
        }
    };

    return (
        <div className="results-container">
            <div className="results-main">
                <div className="results-header">
                    <h1>Analysis Results</h1>
                    <p>Job <span className="code-pill">{job.id}</span> completed successfully.</p>
                </div>
                
                <div className="result-card">
                    <div className="rc-header">Execution Summary</div>
                    <div className="rc-content">
                        <div className="summary-grid">
                            <div><strong>Solver Used:</strong> {solver?.name || 'Unknown'}</div>
                            <div><strong>Category:</strong> <span className={`cat-pill ${solver?.category}`}>{solver?.category}</span></div>
                            <div><strong>Completion Time:</strong> {new Date(completedAt).toLocaleString()}</div>
                            <div><strong>Status:</strong> <span className="status-pill success">{status}</span></div>
                        </div>
                    </div>
                </div>

                <div className="result-card">
                    <div className="rc-header">Solver Output</div>
                    <div className="rc-content">
                        {renderResultBody()}
                    </div>
                </div>
            </div>

            <div className="results-sidebar">
                {/* This would be the contextual AI chat panel */}
                <div className="ai-panel-placeholder">
                    <h4>Contextual AI Assistant</h4>
                    <p>Ask questions about these results...</p>
                </div>
                 <div className="result-card">
                    <div className="rc-header">Solver Details</div>
                     <div className="rc-content">
                        <p><strong>Maturity:</strong> {solver?.maturity}</p>
                        <h5>Strengths:</h5>
                        <ul>{solver?.strengths.map((s,i) => <li key={i}>{s}</li>)}</ul>
                         <h5>Weaknesses:</h5>
                        <ul>{solver?.weaknesses.map((w,i) => <li key={i}>{w}</li>)}</ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
