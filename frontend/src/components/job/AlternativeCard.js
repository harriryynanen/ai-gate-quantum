
import React from 'react';

function AlternativeCard({ solver, reasoning, onSelect }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex flex-col h-full">
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{solver.name}</h3>
        <p className="text-sm font-semibold text-gray-600 uppercase mb-3">{solver.category} - {solver.maturity}</p>

        <p className="text-gray-600 text-sm mb-4">{solver.description}</p>

        <div className="bg-gray-100 p-3 rounded-md mb-4">
            <h4 className="font-bold text-sm text-gray-800 mb-1">AI Reasoning</h4>
            <p className="text-xs text-gray-700">{reasoning}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
              <h4 className="font-semibold text-sm mb-2">Strengths</h4>
              <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                  {solver.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
          </div>
          <div>
              <h4 className="font-semibold text-sm mb-2">Weaknesses</h4>
              <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                  {solver.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
          </div>
        </div>

        <div>
            <h4 className="font-semibold text-sm mb-2">Not Recommended When</h4>
            <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                {solver.notRecommendedWhen.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
        </div>
      </div>

      <div className="mt-6">
        <button 
          onClick={onSelect}
          className="w-full bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
          Override & Run with {solver.uiLabel}
        </button>
      </div>
    </div>
  );
}

export default AlternativeCard;
