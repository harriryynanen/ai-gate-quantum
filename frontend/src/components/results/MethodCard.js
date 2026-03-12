import React from 'react';
import Card from '../common/Card';

const MethodCard = ({ method }) => {
  if (!method) return null;

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-2">Method Used</h3>
      <p className="font-bold text-gray-800">{method.name}</p>
      <p className="text-sm text-gray-600 mt-2"><strong>Reason:</strong> {method.reason}</p>
    </Card>
  );
};

export default MethodCard;
