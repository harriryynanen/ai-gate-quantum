
import React, { useState } from 'react';
import { solvers } from './solverData'; // Updated data source
import './ChooseSolver.css';

const DetailSection = ({ title, items }) => (
    <div className="detail-section">
        <h5>{title}</h5>
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    <strong>{item.name}:</strong> {item.type}
                </li>
            ))}
        </ul>
    </div>
);

const SolverCard = ({ solver }) => (
    <div className="solver-card">
        <div className="card-header">
            <span className="solver-name">{solver.name}</span>
            <div className="solver-meta">
                <span className={`meta-badge type-${solver.type.toLowerCase()}`}>{solver.type}</span>
                <span className="meta-badge maturity">{solver.maturity}</span>
                <span className="meta-badge version">v{solver.version}</span>
            </div>
        </div>

        <p className="solver-description">{solver.description}</p>

        <div className="solver-io">
            <DetailSection title="Expected Inputs" items={solver.inputs} />
            <DetailSection title="Typical Outputs" items={solver.outputs} />
        </div>

        <div className="suitability-hint">
            <strong>Use Case:</strong> {solver.suitability}
        </div>
    </div>
);

const ChooseSolver = () => {
    const [filter, setFilter] = useState('All');

    const filteredSolvers = solvers.filter(solver =>
        filter === 'All' || solver.type === filter
    );

    return (
        <div className="choose-solver-container">
            <div className="solver-filters">
                <p>Filter by type:</p>
                {['All', 'Classical', 'Hybrid', 'Quantum'].map(f => (
                    <button
                        key={f}
                        className={`filter-button ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="solver-list">
                {filteredSolvers.map(solver => (
                    <SolverCard key={solver.id} solver={solver} />
                ))}
            </div>
        </div>
    );
};

export default ChooseSolver;
