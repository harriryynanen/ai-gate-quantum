import React, { useState } from 'react';
import Card from '../components/common/Card';
import DataTable from '../components/data/DataTable';
import DataToolbar from '../components/data/DataToolbar';

const mockData = {
  columns: ['Feature 1', 'Feature 2', 'Target'],
  rows: [
    [0.5, 0.8, 1],
    [0.2, 0.3, 0],
    [0.9, 0.1, 1],
    [0.4, 0.6, 0],
  ],
};

function DataPreparation() {
  const [data, setData] = useState(mockData);
  const [selectedSolver, setSelectedSolver] = useState('');

  const handleUpload = (uploadedData) => {
    // In a real app, you'd parse the uploaded file
    setData(uploadedData);
  };

  const handleSolverSelect = (solver) => {
    setSelectedSolver(solver);
    // Here, you might trigger solver-specific data validation or transformation
  };

  return (
    <div>
      <h2>Data Preparation</h2>
      <Card>
        <DataToolbar onUpload={handleUpload} onSolverSelect={handleSolverSelect} />
        {selectedSolver && <p>Selected Solver: {selectedSolver}</p>}
        <DataTable data={data} />
      </Card>
    </div>
  );
}

export default DataPreparation;
