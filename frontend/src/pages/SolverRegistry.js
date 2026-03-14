
import React, { useState, useEffect } from 'react';
import './SolverRegistry.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const SolverRegistry = () => {
  const [solvers, setSolvers] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolvers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/solvers`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSolvers(data.solvers || []);
      } catch (e) {
        setError(`Failed to fetch solvers: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSolvers();
  }, []);

  const filteredSolvers = filter === 'All' 
    ? solvers 
    : solvers.filter(s => s.category.toLowerCase() === filter.toLowerCase());

  const renderInputs = (inputs) => {
    if (!inputs || Object.keys(inputs).length === 0) return <p>None</p>;
    return (
      <ul>
        {Object.entries(inputs).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="solver-registry">
      <div className="registry-header">
        <h2>Solver Registry</h2>
        <p>Browse available solvers for your computational jobs. Data is sourced live from the backend.</p>
        <div className="filters">
          <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('Classical')} className={filter === 'Classical' ? 'active' : ''}>Classical</button>
          <button onClick={() => setFilter('Hybrid')} className={filter === 'Hybrid' ? 'active' : ''}>Hybrid</button>
          <button onClick={() => setFilter('Quantum')} className={filter === 'Quantum' ? 'active' : ''}>Quantum</button>
        </div>
      </div>
      
      {loading && <p>Loading solvers...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="solver-grid">
          {filteredSolvers.map(solver => (
            <div className="solver-card" key={solver.id}>
              <div className="card-header">
                <h3>{solver.name}</h3>
                <span className={`solver-type ${solver.category.toLowerCase()}`}>{solver.category}</span>
              </div>
              <p className="solver-status">Status: <strong>{solver.status}</strong></p>
              <p className="solver-description">{solver.description}</p>
              
              <div className="solver-details">
                <h4>Expected Inputs</h4>
                {renderInputs(solver.required_inputs)}
                
                <h4>Optional Inputs</h4>
                {renderInputs(solver.optional_inputs)}

                <h4>Output Schema</h4>
                <p>Returns a dictionary with keys like: {Object.keys(solver.output_schema).join(', ')}.</p>

                <h4>Suitability</h4>
                <p>{solver.supported_problem_types.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SolverRegistry;
