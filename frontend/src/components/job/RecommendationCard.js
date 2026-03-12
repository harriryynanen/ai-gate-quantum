
import React from 'react';

const getStatusBadge = (status) => {
    switch (status) {
      case 'strongly_justified':
        return <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Strongly Justified</span>;
      case 'exploratory':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Exploratory</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Not Recommended</span>;
    }
}

function RecommendationCard({ method, confidence, status, reasoning, tradeoffs, onSelect }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-blue-500 flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-3">
            <div>
                <h3 className="text-2xl font-bold text-gray-900">{method.name}</h3>
                <p className="text-sm font-semibold text-blue-600 uppercase">{method.type.replace('_', ' ')}</p>
            </div>
            {getStatusBadge(status)}
        </div>

        <div className="mb-4">
            <span className="font-semibold">AI Confidence:</span>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${confidence * 100}%` }}></div>
            </div>
        </div>

        <p className="text-gray-700 mb-4">{method.description}</p>

        <div className="bg-blue-50 p-4 rounded-md mb-4">
            <h4 className="font-bold text-md text-blue-800 mb-2">AI Reasoning</h4>
            <p className="text-sm text-gray-800">{reasoning}</p>
        </div>

        <div>
            <h4 className="font-semibold text-md mb-2">{tradeoffs.title}</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {Object.entries(tradeoffs.items).map(([key, value]) => (
                     <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
            </ul>
        </div>
      </div>

      <div className="mt-6">
        <button 
          onClick={onSelect}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
          Approve & Run Analysis
        </button>
      </div>
    </div>
  );
}

export default RecommendationCard;
