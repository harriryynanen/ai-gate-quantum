
import React from 'react';

const HybridResult = ({ solverId, result }) => {
    // --- VQE Prototype --- //
    if (solverId === 'vqe_prototype') {
        return (
            <div className="result-body">
                <h4>VQE Prototype Execution</h4>
                <div className="result-warning">This was a placeholder execution and did not run on quantum hardware.</div>
                <p className="result-summary">{result.summary}</p>
                <div className="result-grid">
                    <div><strong>Simulated Eigenvalue:</strong> {result.optimal_value}</div>
                </div>
                <div><strong>Final Parameters (mocked):</strong></div>
                <pre>{JSON.stringify(result.optimal_parameters, null, 2)}</pre>
            </div>
        );
    }

    // --- Default: Quantum-Inspired Annealing --- //
    return (
        <div className="result-body">
            <h4>Quantum-Inspired Annealing Run</h4>
            <p className="result-summary">The annealing process explored the solution space to find a low-energy configuration.</p>
            <div><strong>Problem Framing:</strong> {result.optimizationFraming}</div>
            <div><strong>Search Space Interpretation:</strong> {result.searchSpaceInterpretation}</div>
             <h4>Caveats:</h4>
            <ul>
                {result.exploratoryCaveats?.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    );
};

export default HybridResult;
