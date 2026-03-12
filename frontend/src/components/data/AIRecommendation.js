import React from 'react';
import Card from '../common/Card';

const AIRecommendation = ({ method, reason }) => {
  return (
    <Card className="mb-6 bg-blue-50 border border-blue-200">
      <h3 className="text-lg font-bold text-blue-800">AI Recommended Method</h3>
      <p className="text-xl font-semibold my-2">{method}</p>
      <h4 className="font-semibold text-gray-700 mt-3">Reasoning:</h4>
      <p className="text-gray-600">{reason}</p>
    </Card>
  );
};

export default AIRecommendation;
