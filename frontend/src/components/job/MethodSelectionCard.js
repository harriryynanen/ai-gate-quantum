import React from 'react';
import Card from '../common/Card';
import { Link } from 'react-router-dom';

const MethodSelectionCard = ({ method, isRecommended }) => {
  return (
    <Card className={`border-2 ${isRecommended ? 'border-blue-500' : 'border-gray-300'}`}>
        {isRecommended && <div className="text-sm font-bold text-blue-600 mb-2">AI Recommended</div>}
        <h3 className="text-xl font-bold">{method.name}</h3>
        <p className="text-gray-600 mt-2">{method.description}</p>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h4 className="font-semibold">Why this is a good fit:</h4>
            <p className="text-sm text-gray-700 mt-1">{method.reason}</p>
        </div>

        <div className="mt-6 text-center">
            <Link 
                to="/execution" 
                className={`font-bold py-3 px-6 rounded ${isRecommended ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
                Select & Execute
            </Link>
        </div>
    </Card>
  );
};

export default MethodSelectionCard;
