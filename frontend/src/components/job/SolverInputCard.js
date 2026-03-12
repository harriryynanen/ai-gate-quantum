
import React from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

const ReadinessIcon = ({ status }) => {
  switch (status) {
    case 'ready':
      return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
    case 'needs_attention':
      return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
    case 'not_ready':
      return <XCircleIcon className="h-6 w-6 text-red-500" />;
    default:
      return <InformationCircleIcon className="h-6 w-6 text-gray-400" />;
  }
};

const DetailRow = ({ label, value }) => (
    <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200">
        <dt className="text-sm font-medium text-gray-500 col-span-1">{label}</dt>
        <dd className="text-sm text-gray-900 col-span-2">{value}</dd>
    </div>
);

export const SolverInputCard = ({ contract }) => {
  if (!contract) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mt-8 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
            <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
  }

  const { 
      solverId,
      inputRepresentation,
      explanationForUser,
      readinessStatus,
      readinessWarnings,
      transformSteps,
      missingFields
  } = contract;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Solver Input Preparation</h2>
      
      <div className="flex items-center mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
          <InformationCircleIcon className="h-6 w-6 text-blue-500 mr-3" />
          <p className="text-sm text-blue-700">{explanationForUser}</p>
      </div>

      <dl>
        <DetailRow label="Selected Solver" value={solverId} />
        <DetailRow label="Input Representation" value={inputRepresentation} />
        <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200 items-center">
            <dt className="text-sm font-medium text-gray-500 col-span-1">Readiness Status</dt>
            <dd className="text-sm text-gray-900 col-span-2 flex items-center">
                <ReadinessIcon status={readinessStatus} />
                <span className="ml-2 font-semibold capitalize">{readinessStatus.replace('_', ' ')}</span>
            </dd>
        </div>

        {readinessWarnings && readinessWarnings.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 my-3 rounded-lg">
                <h4 className="font-bold mb-1">Warnings</h4>
                <ul className="list-disc list-inside text-sm">
                    {readinessWarnings.map((warning, index) => <li key={index}>{warning}</li>)}
                </ul>
            </div>
        )}

        {missingFields && missingFields.length > 0 && (
             <div className="bg-red-50 border border-red-200 text-red-800 p-3 my-3 rounded-lg">
                <h4 className="font-bold mb-1">Missing Critical Fields</h4>
                <ul className="list-disc list-inside text-sm">
                    {missingFields.map((field, index) => <li key={index}>{field}</li>)}
                </ul>
            </div>
        )}

        <div className="mt-4">
            <h4 className="text-md font-semibold mb-2">Conceptual Transformation Steps</h4>
            <ul className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                {transformSteps.map((step, index) => <li key={index}>{step}</li>)}
            </ul>
        </div>
      </dl>

    </div>
  );
};
