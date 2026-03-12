import React from 'react';

function ReadinessStatus({ validation }) {
  const isReady = validation?.status === 'Success';

  return (
    <div className={`p-4 rounded-lg ${isReady ? 'bg-green-100' : 'bg-yellow-100'}`}>
      <h3 className="font-bold text-lg mb-2">Execution Readiness</h3>
      <div className="flex items-center">
        {isReady ? (
          <span className="text-2xl mr-3">✅</span>
        ) : (
          <span className="text-2xl mr-3">⚠️</span>
        )}
        <div>
          <p className={`font-semibold ${isReady ? 'text-green-800' : 'text-yellow-800'}`}>
            {isReady ? 'Ready for Execution' : 'Pending Validation'}
          </p>
          <p className="text-sm text-gray-700">
            {validation?.overallMessage || 'Complete data preparation first.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReadinessStatus;
