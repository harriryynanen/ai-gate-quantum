import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
      {title && <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
