import React from 'react';
import Card from '../common/Card';

function DataQualityPanel({ qualityCheck }) {
  if (!qualityCheck) return null;

  const { errors, warnings } = qualityCheck;

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-3">Data Quality Report</h3>
      {errors.length > 0 && (
        <div className="mb-4">
          <h4 className="font-bold text-red-600">Errors:</h4>
          <ul className="list-disc list-inside text-red-500 text-sm">
            {errors.map((error, index) => (
              <li key={`err-${index}`}>{error.field && <strong>{error.field}: </strong>}{error.message}</li>
            ))}
          </ul>
        </div>
      )}
      {warnings.length > 0 && (
        <div>
          <h4 className="font-bold text-yellow-600">Warnings:</h4>
          <ul className="list-disc list-inside text-yellow-500 text-sm">
            {warnings.map((warning, index) => (
              <li key={`warn-${index}`}>{warning.field && <strong>{warning.field}: </strong>}{warning.message}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

export default DataQualityPanel;
