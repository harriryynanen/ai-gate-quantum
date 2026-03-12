import React from 'react';
import Card from '../common/Card';

function DatasetSummary({ dataset }) {
  if (!dataset) return null;

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-2">Dataset Summary</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <div><strong>Name:</strong> {dataset.name}</div>
        <div><strong>Source:</strong> {dataset.sourceType}</div>
        <div><strong>Rows:</strong> {dataset.rowCount.toLocaleString()}</div>
        <div><strong>Size:</strong> {dataset.sizeKB} KB</div>
        <div><strong>Uploaded:</strong> {new Date(dataset.uploadedAt).toLocaleString()}</div>
      </div>
    </Card>
  );
}

export default DatasetSummary;
