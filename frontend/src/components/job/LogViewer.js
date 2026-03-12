import React, { useRef, useEffect } from 'react';

const LogViewer = ({ logs }) => {
  const logContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever logs update
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div 
      ref={logContainerRef} 
      style={{
        border: '1px solid #e2e8f0', 
        borderRadius: '0.375rem',
        padding: '1rem', 
        height: '300px', 
        overflowY: 'scroll', 
        backgroundColor: '#f8fafc', 
        color: '#1e293b',
      }}
    >
      {logs.map((log, i) => (
        // FIX: Render the properties of the log object, not the object itself.
        <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.9em', whiteSpace: 'pre-wrap' }}>
          <span style={{ color: '#64748b' }}>{log.time}</span>
          <span style={{ marginLeft: '1rem' }}>{log.message}</span>
        </div>
      ))}
    </div>
  );
};

export default LogViewer;
