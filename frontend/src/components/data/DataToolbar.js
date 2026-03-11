import React from 'react';

const DataToolbar = ({ onUpload, onSolverSelect }) => {
  const handleFileChange = (e) => {
    // Mock uploading data
    const mockUploadedData = {
      columns: ['New Feature 1', 'New Feature 2', 'New Target'],
      rows: [
        [10, 20, 1],
        [30, 40, 0],
      ],
    };
    onUpload(mockUploadedData);
  };

  return (
    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <input type="file" onChange={handleFileChange} style={{ marginRight: '10px' }} />
      </div>
      <div>
        <select onChange={(e) => onSolverSelect(e.target.value)} style={{ padding: '8px' }}>
          <option value="">Select Solver</option>
          <option value="qiskit-vqe">Qiskit VQE</option>
          <option value="dwave-annealer">DWave Annealer</option>
        </select>
      </div>
    </div>
  );
};

export default DataToolbar;
