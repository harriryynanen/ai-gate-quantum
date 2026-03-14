
import React from 'react';

const ClassicalResult = ({ solverId, result }) => {
    // --- Linear Regression --- //
    if (solverId === 'linear_regression') {
        return (
            <div className="result-body">
                <h4>Linear Regression Fit</h4>
                <p className="result-summary">{result.summary}</p>
                <div className="result-grid">
                    <div><strong>Model R-squared:</strong> {result.r_squared?.toFixed(4)}</div>
                    <div><strong>Model Intercept:</strong> {result.intercept?.toFixed(4)}</div>
                </div>
                <div><strong>Feature Coefficients:</strong></div>
                <pre>{JSON.stringify(result.coefficients, null, 2)}</pre>
            </div>
        );
    }

    // --- Default: Classical Baseline (Optimization) --- //
    return (
        <div className="result-body">
            <h4>Optimization Result</h4>
            <p className="result-summary">{result.summary || 'The optimization process has concluded.'}</p>
             <div className="result-grid">
                <div><strong>Final Objective Value:</strong> {result.objectiveValue}</div>
            </div>
            <div><strong>Optimal Solution Vector:</strong></div>
            <pre>{JSON.stringify(result.solution, null, 2)}</pre>
        </div>
    );
};

export default ClassicalResult;
