import React from 'react';

const DataTable = ({ data }) => {
  if (!data || !data.columns || !data.rows) {
    return <p>No data to display.</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {data.columns.map((col, i) => (
            <th key={i} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} style={{ border: '1px solid #ddd', padding: '8px' }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
