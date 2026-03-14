import React from 'react';
import './MapData.css';

// Mock data for source and target fields
const sourceFields = ['CustomerID', 'Age', 'PurchaseAmount', 'Location'];
const targetFields = [
  { name: 'user_id', type: 'Integer', description: 'Unique identifier for the user.' },
  { name: 'transaction_value', type: 'Float', description: 'The monetary value of the transaction.' },
  { name: 'user_location', type: 'String', description: 'The geographical location of the user.' },
  { name: 'user_age', type: 'Integer', description: 'The age of the user.' },
];

const MapData = () => {
  return (
    <div className="map-data-container">
      <div className="mapping-instructions card-style">
        <h3>Map Source Fields to Target Fields</h3>
        <p>Match the columns from your data file (Source) to the fields required by the solver (Target).</p>
      </div>

      <div className="mapping-table-container card-style">
        <table className="mapping-table">
          <thead>
            <tr>
              <th>Source Field (Your Data)</th>
              <th></th>
              <th>Target Field (Solver Requirement)</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {targetFields.map(target => (
              <tr key={target.name}>
                <td>
                  <select className="source-select">
                    <option value="">Select a field...</option>
                    {sourceFields.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </td>
                <td className="arrow-column">→</td>
                <td>{target.name} <span className="target-type">({target.type})</span></td>
                <td>{target.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       <div className="validation-notice warning-notice">
          <p><strong>Warning:</strong> The field 'user_age' has a type mismatch. Source is 'Integer' but a different type was expected.</p>
        </div>

        <div className="validation-notice error-notice">
          <p><strong>Error:</strong> The required field 'user_id' has not been mapped.</p>
        </div>
    </div>
  );
};

export default MapData;
