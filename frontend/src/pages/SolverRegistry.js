
import React from 'react';
import { solvers } from '../solverCatalog/solverDefinitions';
import './SolverRegistry.css';

const SolverRegistry = () => {
    return (
        <div className="registry-container">
            <h1>Solver Registry</h1>
            <p className="subtitle">A comprehensive catalog of all computational solvers available in the platform.</p>
            
            <div className="solver-grid">
                {solvers.map(solver => (
                    <div key={solver.id} className="solver-card">
                        <div className="sc-header">
                            <span className={`cat-pill ${solver.category}`}>{solver.category}</span>
                            <h3>{solver.name}</h3>
                        </div>
                        <div className="sc-body">
                            <p><strong>Maturity:</strong> {solver.maturity}</p>
                            <p className="description">{solver.description}</p>
                            
                            <h5>Suitable Problem Types:</h5>
                            <div className="tags">
                                {solver.suitableProblemTypes.map(type => <span key={type} className="tag">{type}</span>)}
                            </div>

                             <h5>Strengths:</h5>
                            <ul>
                                {solver.strengths.map(s => <li key={s}>{s}</li>)}
                            </ul>
                        </div>
                        <div className="sc-footer">
                            <button disabled={!solver.enabled}>Configure Job</button>
                            <a href={`#${solver.referenceCodePath}`} className="code-link">Reference Code</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolverRegistry;
