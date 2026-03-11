import React from 'react';

const ResultSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <div style={{ margin: '20px 0' }}>
      <h4>Result Summary</h4>
      <dl>
        {Object.entries(summary).map(([key, value]) => (
          <React.Fragment key={key}>
            <dt style={{ fontWeight: 'bold' }}>{key}</dt>
            <dd style={{ marginLeft: '20px', marginBottom: '10px' }}>{value}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
};

export default ResultSummary;
