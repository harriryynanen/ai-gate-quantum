import React, { useState } from 'react';
import './DataPreparation.css';

const DataPreparation = () => {
  const [file, setFile] = useState(null);

  // Mock data for profiling results
  const profilingResults = {
    fileName: 'customer_data.csv',
    rowCount: 10520,
    columns: [
      { name: 'CustomerID', type: 'Integer', quality: 'OK' },
      { name: 'Age', type: 'Integer', quality: 'Warning', issues: '3% missing values' },
      { name: 'PurchaseAmount', type: 'Float', quality: 'OK' },
      { name: 'Location', type: 'String', quality: 'OK' },
    ]
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="data-preparation-container">
      <div className="upload-card card-style">
        <h3>Upload Data File</h3>
        <p>Select a CSV or Parquet file to begin profiling.</p>
        <input type="file" onChange={handleFileChange} />
        {file && <p>Selected file: {file.name}</p>}
      </div>

      {/* This section would appear after a file is uploaded and processed */}
      {file && (
        <div className="profiling-results-card card-style">
          <h3>Data Profile</h3>
          <div className="profile-summary">
            <span><strong>File:</strong> {profilingResults.fileName}</span>
            <span><strong>Rows:</strong> {profilingResults.rowCount.toLocaleString()}</span>
          </div>
          <table className="profile-table">
            <thead>
              <tr>
                <th>Column Name</th>
                <th>Data Type</th>
                <th>Quality</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {profilingResults.columns.map(col => (
                <tr key={col.name}>
                  <td>{col.name}</td>
                  <td>{col.type}</td>
                  <td>
                    <span className={`quality-badge ${col.quality.toLowerCase()}`}>{col.quality}</span>
                  </td>
                  <td>{col.issues || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataPreparation;
