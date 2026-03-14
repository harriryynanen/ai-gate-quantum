import React from 'react';
import './ProfilingResult.css';

const ProfilingResult = () => {
  return (
    <div className="profiling-result-container">
      <h3>Profiling Result</h3>
      <table>
        <thead>
          <tr>
            <th>Column Name</th>
            <th>Data Type</th>
            <th>Missing Values</th>
          </tr>
        </thead>
        <tbody>
          {/* Placeholder for profiling data */}
          <tr>
            <td>id</td>
            <td>integer</td>
            <td>0</td>
          </tr>
          <tr>
            <td>name</td>
            <td>string</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfilingResult;
