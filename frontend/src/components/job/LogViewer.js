import React, { useRef, useEffect } from 'react';

const LogViewer = ({ logs }) => {
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div ref={logContainerRef} style={{ 
      border: '1px solid #eee', 
      padding: '10px', 
      marginTop: '20px', 
      height: '300px', 
      overflowY: 'scroll', 
      backgroundColor: '#f5f5f5' 
    }}>
      {logs.map((log, i) => (
        <div key={i} style={{ fontFamily: 'monospace', fontSize: '0.9em' }}>{log}</div>
      ))}
    </div>
  );
};

export default LogViewer;
