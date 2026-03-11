import React from 'react';

const JobProgress = ({ progress }) => {
  return (
    <div style={{ 
      width: '100%', 
      backgroundColor: '#e0e0de', 
      borderRadius: '5px', 
      margin: '20px 0' 
    }}>
      <div style={{ 
        width: `${progress}%`, 
        height: '20px', 
        backgroundColor: '#4caf50', 
        borderRadius: '5px', 
        textAlign: 'center', 
        color: 'white', 
        lineHeight: '20px' 
      }}>
        {progress}%
      </div>
    </div>
  );
};

export default JobProgress;
