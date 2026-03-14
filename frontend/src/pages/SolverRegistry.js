import React, { useState } from 'react';
import './SolverRegistry.css';

const solvers = [
  { name: 'Classical Optimizer', type: 'Classical', description: 'A standard, heuristics-based solver for optimization problems.' },
  { name: 'Quantum Annealer Sim', type: 'Quantum', description: 'Simulated quantum annealing for quadratic unconstrained binary optimization.' },
  { name: 'Hybrid Genetic Algorithm', type: 'Hybrid', description: 'A hybrid approach combining classical genetic algorithms with quantum-inspired elements.' },
  { name: 'Variational Quantum Eigensolver', type: 'Quantum', description: 'VQE algorithm for finding the ground state of a molecule or system.' },
];

const SolverRegistry = () => {
  const [filter, setFilter] = useState('All');

  const filteredSolvers = filter === 'All' ? solvers : solvers.filter(s => s.type === filter);

  return (
    <div className="solver-registry">
      <div className="registry-header">
        <h2>Solver Registry</h2>
        <p>Browse available solvers for your computational jobs.</p>
        <div className="filters">
          <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('Classical')} className={filter === 'Classical' ? 'active' : ''}>Classical</button>
          <button onClick={() => setFilter('Hybrid')} className={filter === 'Hybrid' ? 'active' : ''}>Hybrid</button>
          <button onClick={() => setFilter('Quantum')} className={filter === 'Quantum' ? 'active' : ''}>Quantum</button>
        </div>
      </div>
      <div className="solver-grid">
        {filteredSolvers.map(solver => (
          <div className="solver-card" key={solver.name}>
            <h3>{solver.name}</h3>
            <span className={`solver-type ${solver.type.toLowerCase()}`}>{solver.type}</span>
            <p>{solver.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolverRegistry;
