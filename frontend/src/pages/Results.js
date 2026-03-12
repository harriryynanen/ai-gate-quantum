import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/common/Card';
import ResultSummary from '../components/results/ResultSummary';
import CodeSnapshotPanel from '../components/job/CodeSnapshotPanel';
import RawOutput from '../components/results/RawOutput';

const mockResult = {
  jobName: 'Q3 Financial Risk Analysis',
  solver: 'Quantum Risk Solver v1.2',
  summary: {
    'Execution Time': '45.2s',
    'Optimal Risk': '0.42',
    'Confidence': 'High',
  },
  rawOutput: JSON.stringify(
    {
      results: {
        optimal_risk: 0.42,
        confidence: 'High',
        execution_trace: ['...log data...'],
      },
    },
    null,
    2
  ),
  codeSnapshot: `def solve(data):
    # Quantum-inspired optimization logic
    print("Analyzing risk...")
    return {'optimal_risk': 0.42}`,
};

function Results() {
  const { sessionId } = useParams();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
            <h1 className="text-3xl font-bold">Analysis Results</h1>
            <p className="text-sm text-gray-500">Session ID: {sessionId}</p>
        </div>
        <Link to="/history" className="text-blue-500 hover:underline">&larr; Back to Job History</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <h3 className="text-lg font-semibold">{mockResult.jobName}</h3>
                <p className="text-sm text-gray-500 mb-4">Solver: {mockResult.solver}</p>
                <ResultSummary summary={mockResult.summary} />
                <RawOutput output={mockResult.rawOutput} />
            </Card>
            <CodeSnapshotPanel code={mockResult.codeSnapshot} />
        </div>
        <div className="lg:col-span-1">
          {/* The contextual AI side panel is now part of the MainLayout */}
        </div>
      </div>
    </div>
  );
}

export default Results;
