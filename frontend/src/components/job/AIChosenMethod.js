import React from 'react';
import Card from '../common/Card';

const AIChosenMethod = ({ solver }) => {
  return (
    <Card className="bg-gray-50">
      <h3 className="text-lg font-bold">AI-Selected Method</h3>
      <p className="text-xl font-semibold my-1">{solver.name}</p>
      <p className="text-sm text-gray-600">{solver.description}</p>
    </Card>
  );
};

export default AIChosenMethod;
