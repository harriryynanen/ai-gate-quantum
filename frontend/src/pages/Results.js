import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/common/Card';
import ResultSummary from '../components/results/ResultSummary';
import ResultChart from '../components/results/ResultChart';
import RawOutput from '../components/results/RawOutput';
import AIChatWorkspace from './AIChatWorkspace'; // Re-using the chat workspace

const mockResult = {
  jobId: '124',
  jobName: 'Protein Folding',
  status: 'succeeded',
  summary: {
    'Execution Time': '120.5s',
    'Final Energy': '-2.14 Ha',
    'Optimizer Steps': 42,
  },
  chartData: { // Placeholder for chart
    labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
    values: [-1.5, -1.8, -2.0, -2.1, -2.14],
  },
  rawOutput: '{\n  "result": {\n    "energy": -2.14,\n    "optimizer_history": [...],\n    "final_parameters": [...],\n  }\n}',
};

function Results() {
  const { jobId } = useParams();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
      <div>
        <h2>Results for Job #{jobId}</h2>
        <Card>
          <h3>{mockResult.jobName}</h3>
          <ResultSummary summary={mockResult.summary} />
          <ResultChart data={mockResult.chartData} />
          <RawOutput output={mockResult.rawOutput} />
          <Link to="/history">
            <button style={{ marginTop: '20px' }}>Back to Job History</button>
          </Link>
        </Card>
      </div>
      <div>
        <h3>Contextual AI Assistant</h3>
        <AIChatWorkspace />
      </div>
    </div>
  );
}

export default Results;
