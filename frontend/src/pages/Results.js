import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import ResultSummary from '../components/results/ResultSummary';
import RawOutput from '../components/results/RawOutput';
import MethodCard from '../components/results/MethodCard'; // Import the new component
import { mockResults } from '../mocks/mockData';

function Results() {
  const { sessionId } = useParams();

  // Note: In a real app, you'd fetch results based on sessionId
  const { summary, rawOutput, method } = mockResults;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Analysis Results</h1>
        <p className="text-sm text-gray-500">Session ID: {sessionId}</p>
      </div>

      <div className="space-y-6">
        <Card>
          <ResultSummary summary={summary} />
          <RawOutput output={rawOutput} />
        </Card>

        <MethodCard method={method} />

        {/* The AI Assistant panel on the right will show the next steps */}
      </div>
    </div>
  );
}

export default Results;
