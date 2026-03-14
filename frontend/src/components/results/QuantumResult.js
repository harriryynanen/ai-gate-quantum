
import React from 'react';

const QuantumResult = ({ solverId, result }) => {
    // --- Grover's Search (Simulator) --- //
    if (solverId === 'grover_search') {
        return (
            <div className="result-body">
                <h4>Grover"s Search (Qiskit Simulator)</h4>
                <p className="result-summary">{result.summary}</p>
                <div className="result-grid">
                    <div><strong>Most frequent result:</strong> {result.found_element}</div>
                    <div><strong>Executed On:</strong> <span className="code-pill">{result.executed_on}</span></div>
                </div>
                <h4>Measurement Counts:</h4>
                <pre>{JSON.stringify(result.measurements, null, 2)}</pre>
            </div>
        );
    }

    // --- Default: QAOA Candidate (Exploratory) --- //
    return (
        <div className="result-body">
            <h4>QAOA Candidate Analysis</h4>
            <div className="result-warning">This is an exploratory analysis and does not represent a full execution.</div>
            <p><strong>Conceptual Mapping Quality:</strong> {result.conceptualMappingQuality}</p>
            <p><strong>Exploratory Status:</strong> {result.exploratoryStatus}</p>
        </div>
    );
};

export default QuantumResult;
