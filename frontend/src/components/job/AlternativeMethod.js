
import React from 'react';

function AlternativeMethod({ method, onSelect }) {
  return (
    <div className="p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Alternative: {method.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{method.reasoning}</p>
        </div>
        <button 
            onClick={() => onSelect(method)} 
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-400">
            Override & Select
        </button>
      </div>
    </div>
  );
}

export default AlternativeMethod;
