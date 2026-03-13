
import React from 'react';

const GenericTransparencyView = ({ execution }) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
        <div className="flex">
            <div className="flex-shrink-0">
                {/* Heroicon name: exclamation */}
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 3.01-1.742 3.01H4.42c-1.53 0-2.493-1.676-1.743-3.01l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="ml-3">
                <p className="text-sm text-yellow-700">
                    A specific result viewer is not available for solver: 
                    <span className="font-bold"> {execution?.solverId ?? 'unknown'}</span>.
                </p>
                <p className="mt-2 text-sm text-yellow-600">
                    Showing raw execution data to ensure transparency.
                </p>
                <div className="mt-4 bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                    <pre>{JSON.stringify(execution, null, 2)}</pre>
                </div>
            </div>
        </div>
    </div>
  );
};

export default GenericTransparencyView;
