export const mockExecution = {
  timeline: [
    { name: 'Queued', status: 'complete', stage: 0 },
    { name: 'Starting', status: 'complete', stage: 1 },
    { name: 'Data Validation', status: 'active', stage: 2 },
    { name: 'Running Solver', status: 'pending', stage: 3 },
    { name: 'Processing Results', status: 'pending', stage: 4 },
    { name: 'Complete', status: 'pending', stage: 5 },
  ],
  logs: [
    { time: '2023-10-27 10:30:01', stage: 0, message: 'Job received and queued.' },
    { time: '2023-10-27 10:30:05', stage: 1, message: 'Execution environment spinning up.' },
    { time: '2023-10-27 10:30:10', stage: 2, message: 'Input data schema validated successfully.' },
    { time: '2023-10-27 10:30:15', stage: 3, message: 'Starting quantum-inspired solver.' },
    { time: '2023-10-27 10:30:20', stage: 3, message: 'Epoch 1/100, loss: 0.98' },
  ],
  code: `from qiskit import Aer, execute
# Sample from solver template
def solve(data):
    """Quantum-inspired portfolio optimization"""
    print("Initializing simulation...")
    # ... solver logic ...
    return {
        'optimal_weights': [0.2, 0.5, 0.3],
        'expected_return': 0.12
    }`,
  metadata: {
    method: 'Quantum-Inspired Annealing',
    environment: 'Python 3.9 on Cloud Run',
    executor: 'Qiskit Aer (local simulation)',
    shots: 1024,
    seed: 42,
    transpilation: 'Level 3 (mock)',
  },
};

export const mockResults = {
  summary: {
    title: 'Optimal Portfolio Allocation',
    finding: 'The model suggests a portfolio heavily weighted towards tech and healthcare.',
    confidence: 'High',
  },
  rawOutput: JSON.stringify({ optimal_weights: { AAPL: 0.4, MSFT: 0.6 }, sharpe_ratio: 2.1 }, null, 2),
  method: {
    name: 'Quantum-Inspired Annealing',
    reason: 'Chosen for its ability to handle complex combinatorial optimization problems effectively.'
  },
  nextSteps: [
    {
      title: 'Accept and Finalize Report',
      description: 'Accept the results and generate the final investment report.',
      isRecommended: true,
    },
    {
      title: 'Re-run with different parameters',
      description: 'Adjust solver parameters and re-run the execution to explore other scenarios.',
      isRecommended: false,
    }
  ]
};