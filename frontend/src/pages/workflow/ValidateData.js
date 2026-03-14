import React from 'react';
import './ValidateData.css';

// Mock data for validation summary
const validationSummary = {
  status: 'Ready', // Other statuses: 'Error', 'Warning'
  checks: [
    { description: 'All required fields are mapped.', status: 'Success' },
    { description: 'Data types match target schema.', status: 'Success' },
    { description: 'No missing values detected in critical fields.', status: 'Success' },
  ],
  errors: [],
  warnings: [
    'The file contains 3% more columns than the target schema requires. These extra columns will be ignored.'
  ]
};

const CheckItem = ({ check }) => (
    <li className={`check-item ${check.status.toLowerCase()}`}>
        <span className="status-icon">
            {check.status === 'Success' ? '✓' : '!'}
        </span>
        {check.description}
    </li>
);

const ValidateData = () => {
  const isReady = validationSummary.status === 'Ready';

  return (
    <div className="validate-data-container">
      <div className="summary-card card-style">
        <h3>Validation Summary</h3>
        
        <div className="status-banner status-ready">
            <h4>Status: Ready for Execution</h4>
            <p>All validation checks passed successfully. The data is ready to be used with the selected solver.</p>
        </div>

        <div className="checks-list">
            <ul>
                {validationSummary.checks.map((check, index) => (
                    <CheckItem key={index} check={check} />
                ))}
            </ul>
        </div>

        {validationSummary.warnings.length > 0 && (
            <div className="notice warning">
                <h5>Warnings</h5>
                {validationSummary.warnings.map((warning, index) => (
                    <p key={index}>{warning}</p>
                ))}
            </div>
        )}

        <div className="approval-actions">
            <button className="button-approve" disabled={!isReady}>
                Approve & Proceed to Execution
            </button>
            <button className="button-reject">Reject & Return to Mapping</button>
        </div>
      </div>
    </div>
  );
};

export default ValidateData;
