import React, { useState, useEffect } from 'react';

const SolverParameters = ({ solver, onParamChange }) => {
  const [params, setParams] = useState({});

  useEffect(() => {
    // Reset params when solver changes
    const defaultParams = solver === 'qiskit-vqe' ? { optimizer: 'ADAM', shots: 1024 } : { annealing_time: 20 };
    setParams(defaultParams);
    onParamChange(defaultParams);
  }, [solver, onParamChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params, [name]: value };
    setParams(newParams);
    onParamChange(newParams);
  };

  return (
    <div style={{ border: '1px solid #eee', padding: '15px', margin: '20px 0' }}>
      <h4>Solver Parameters</h4>
      {solver === 'qiskit-vqe' && (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <label>Optimizer: </label>
            <select name="optimizer" value={params.optimizer || 'ADAM'} onChange={handleChange}>
              <option value="ADAM">ADAM</option>
              <option value="SPSA">SPSA</option>
            </select>
          </div>
          <div>
            <label>Shots: </label>
            <input
              type="number"
              name="shots"
              value={params.shots || 1024}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
      {solver === 'dwave-annealer' && (
        <div>
          <label>Annealing Time (µs): </label>
          <input
            type="number"
            name="annealing_time"
            value={params.annealing_time || 20}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default SolverParameters;
