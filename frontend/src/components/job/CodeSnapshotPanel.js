import React from 'react';
import Card from '../common/Card';

function CodeSnapshotPanel({ code, language = 'python' }) {
  if (!code) return null;

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-2">Code Snapshot</h3>
      <p className="text-sm text-gray-500 mb-3">
        This is a snapshot of the solver logic that will be executed in a secure Python environment.
      </p>
      <div className="bg-gray-900 rounded-md overflow-hidden text-sm p-4">
        <pre className="text-white whitespace-pre-wrap">
          <code>
            {code}
          </code>
        </pre>
      </div>
    </Card>
  );
}

export default CodeSnapshotPanel;
