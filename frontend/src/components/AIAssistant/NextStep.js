import React from 'react';
import { Link } from 'react-router-dom';

const NextStep = ({ step }) => {
  if (!step) return null;

  const isRecommended = step.isRecommended !== false; // Default to true if not specified

  const content = (
    <div className={`p-4 rounded-md ${isRecommended ? 'bg-blue-50 border-blue-200 border' : 'bg-gray-50'}`}>
        <h4 className="font-bold text-md">{isRecommended ? 'Recommended Next Step' : 'Next Step'}</h4>
        <p className="font-semibold text-gray-800 mt-2">{step.title}</p>
        <p className="text-sm text-gray-700 mt-1">{step.description}</p>
    </div>
  );

  if (step.link) {
    return (
      <Link to={step.link} className="block hover:shadow-lg rounded-md">
          {content}
      </Link>
    );
  } 

  // Fallback for non-clickable steps
  return content;
};

export default NextStep;
