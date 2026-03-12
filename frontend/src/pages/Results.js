
import React, { useContext } from 'react';
import Card from '../components/common/Card';
import ResultSummary from '../components/results/ResultSummary';
import RawOutput from '../components/results/RawOutput';
import MethodCard from '../components/results/MethodCard';
import { SessionContext } from '../context/SessionContext';

function Results() {
  const { session } = useContext(SessionContext);

  // Guard against missing data
  if (!session || !session.job || !session.job.results) {
    return (
        <div>
            <h1 className="text-3xl font-bold">Analysis Results</h1>
            <p className="mt-4">No results available. Please complete a job first.</p>
        </div>
    );
  }

  const { summary, rawOutput } = session.job.results;
  const { method } = session.job.config;

  const displayMethod = {
      name: method.name,
      description: 'This is the solver method used for the final analysis.'
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Analysis Results</h1>
        <p className="text-sm text-gray-500">Session ID: {session.id}</p>
      </div>

      <div className="space-y-6">
        <Card>
          <ResultSummary summary={summary} />
          <RawOutput output={rawOutput} />
        </Card>

        <MethodCard method={displayMethod} />

        {/* The AI Assistant panel on the right will show the next steps */}
      </div>
    </div>
  );
}

export default Results;
