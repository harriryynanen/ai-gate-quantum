
import React from 'react';
import Card from '../common/Card';

function RecommendedMethod({ method, justification, confidence, onApprove }) {

  const confidenceColor = confidence > 0.9 ? 'text-green-600' : 'text-yellow-600';

  return (
    <Card type="highlight">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">Recommended: {method.name}</h2>
        <p className="mb-4"><strong>Confidence:</strong> <span className={confidenceColor}>{(confidence * 100).toFixed(0)}%</span></p>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h4 className="font-semibold">AI Justification:</h4>
          <p className="text-gray-700">{justification}</p>
        </div>

        <div>
            <h4 className="font-semibold mb-2">Advantages of this approach:</h4>
            <ul className="list-disc list-inside space-y-1">
                {method.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
            </ul>
        </div>

        <div className="mt-6 text-center">
            <button onClick={() => onApprove(method)} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 text-lg">
                Approve & Run Analysis
            </button>
        </div>
      </div>
    </Card>
  );
}

export default RecommendedMethod;
