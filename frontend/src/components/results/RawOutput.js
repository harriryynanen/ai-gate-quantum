import React from 'react';

const RawOutput = ({ output }) => {
  if (!output) return null;

  return (
    <div style={{ margin: '20px 0' }}>
      <h4>Raw Output</h4>
      <pre style={{
        backgroundColor: '#2d2d2d',
        color: '#f1f1f1',
        padding: '15px',
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
      }}>
        <code>{output}</code>
      </pre>
    </div>
  );
};

export default RawOutput;
