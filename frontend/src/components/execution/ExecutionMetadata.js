import React from 'react';
import Card from '../common/Card';

const ExecutionMetadata = ({ metadata }) => {
  if (!metadata) return null;

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Method & Environment</h3>
      <div className="text-sm text-gray-600">
        <p><strong>Method:</strong> {metadata.method}</p>
        <p><strong>Environment:</strong> {metadata.environment}</p>
        <p><strong>Executor:</strong> {metadata.executor}</p>
        <hr className="my-2" />
        <p className="font-mono text-xs"><strong>Shots:</strong> {metadata.shots}</p>
        <p className="font-mono text-xs"><strong>Seed:</strong> {metadata.seed}</p>
        <p className="font-mono text-xs"><strong>Transpilation:</strong> {metadata.transpilation}</p>
      </div>
    </Card>
  );
};

export default ExecutionMetadata;
