import React from 'react';

const DatasetRecap = ({ dataset }) => {
  if (!dataset) {
    return <p>No dataset selected.</p>;
  }

  return (
    <div className="dataset-recap">
      <h3>Dataset: {dataset.name}</h3>
      <p>ID: {dataset.id}</p>
      <p>Source: {dataset.source}</p>
    </div>
  );
};

export default DatasetRecap;
