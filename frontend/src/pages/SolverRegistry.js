
import React, { useState } from 'react';
import { solvers } from '../solverCatalog/solverDefinitions';
import './SolverRegistry.css';

const SolverRegistry = () => {
    const [filter, setFilter] = useState('all');

    const getCategoryBadge = (category) => {
        if (category === 'quantum') return 'badge-quantum';
        if (category === 'hybrid') return 'badge-hybrid';
        return 'badge-classical';
    };

    const getStatusBadge = (status) => {
        if (status === 'runnable' || status === 'simulator') return 'badge-complete';
        if (status === 'prototype') return 'badge-in-progress';
        return '';
    }

    const filteredSolvers = solvers.filter(solver => filter === 'all' || solver.category === filter);

    return (
        <div className="solver-registry-container">
            <div className="dashboard-header">
                <div className="dh-title">Solver Registry</div>
                <div className="dh-sub">V1 Solvers — all documented, versioned, and tested</div>
            </div>

            <div className="filter-bar">
                <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
                <button onClick={() => setFilter('classical')} className={filter === 'classical' ? 'active' : ''}>Classical</button>
                <button onClick={() => setFilter('hybrid')} className={filter === 'hybrid' ? 'active' : ''}>Hybrid</button>
                <button onClick={() => setFilter('quantum')} className={filter === 'quantum' ? 'active' : ''}>Quantum</button>
            </div>

            <div className="solvers-page">
                {filteredSolvers.map(solver => (
                    <div className="solver-browser-card" key={solver.id}>
                        <div className="sbc-header">
                            <div className="sbc-name-wrap">
                                <div className="sbc-name">{solver.name}</div>
                                <span className={`badge ${getCategoryBadge(solver.category)}`}>{solver.category}</span>
                                <span style={{fontSize: '11px', color: 'var(--q-hint)', fontFamily: 'var(--mono)'}}>v1.0</span>
                            </div>
                            <span className={`badge ${getStatusBadge(solver.runtimeStatus)}`}>{solver.runtimeStatus}</span>
                        </div>
                        <div className="sbc-body">
                            <div className="sbc-desc">{solver.description}</div>
                            <div className="sbc-meta-row">
                                <div className="sbc-meta-item"><strong>Domain</strong>{solver.suitableProblemTypes.join(', ')}</div>
                                <div className="sbc-meta-item"><strong>Method</strong>{solver.strengths.slice(0, 1).join(', ')}</div>
                            </div>
                            <div className="code-snippet">
                                <span className="cs-com"># Required Inputs</span><br />
                                <span className="cs-plain">inputs = {'{'}</span><br />
                                {Object.entries(solver.requiredInputs).map(([key, value]) => (
                                    <React.Fragment key={key}>
                                        <span className="cs-plain">&nbsp;&nbsp;</span>
                                        <span className="cs-str">"{key}"</span>
                                        <span className="cs-plain">: </span>
                                        <span className="cs-com">/* {value} */</span>
                                        <br />
                                    </React.Fragment>
                                ))}
                                <span className="cs-plain">{'}'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolverRegistry;
