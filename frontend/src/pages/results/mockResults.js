
export const classicalResult = {
  id: 'c-12345',
  jobId: 'job-abcde',
  timestamp: '2024-07-16T10:00:00Z',
  solverId: 'classical_baseline',
  solverType: 'Classical',
  uiLabel: 'Classical Baseline (Reference)',
  summary: 'The classical baseline solver found a feasible solution by optimizing the primary objective.',
  interpretation: 'This result serves as a solid baseline for performance and quality. It represents a standard, well-understood approach to this type of problem. Compare other, more experimental methods against this result.',
  comparisonBaseline: {
    recommendedPath: 'Classical Baseline',
    alternativePath: 'Quantum-Inspired Annealing',
    reasoning: 'Start with a known, reliable method to establish a performance benchmark before exploring experimental approaches.',
    baselineUsed: 'This execution itself.'
  },
  transparencyNotes: {
    executionNarrative: 'The solver input was mapped to a deterministic backend function that simulated a classical optimization process.',
    guardrails: ['The result is deterministic for the given input.', 'Performance is predictable and well-understood.']
  },
  solverSpecificResults: {
    cost: 1250.75,
    solutionQuality: 'Optimal',
  }
};

export const quantumResult = {
  id: 'q-67890',
  jobId: 'job-fghij',
  timestamp: '2024-07-16T11:30:00Z',
  solverId: 'qaoa_simulated',
  solverType: 'Quantum',
  uiLabel: 'QAOA (Exploratory)',
  summary: 'The QAOA solver explored a quantum-inspired approach to the problem, identifying a potential solution.',
  interpretation: 'Low. The quantum mechanics of the algorithm are not intuitive, and the results can be difficult to interpret.',
  limitations: [
    'Performance is highly dependent on the choice of parameters (p) and the classical optimization loop.',
    'The quality of the solution is not guaranteed and can be noisy.'
  ],
  transparencyNotes: {
    executionNarrative: 'The simulation involved creating a parameterized quantum circuit (ansatz) and using a classical optimizer to tune its parameters. This was all simulated on classical hardware.',
    guardrails: [
      'This is a simulation of a quantum algorithm on a classical computer.',
      'It provides no evidence of quantum advantage.',
      'The results are for educational and research purposes only.'
    ]
  },
  solverSpecificResults: {
    exploratoryStatus: 'This is a conceptual, simulated execution to demonstrate the potential structure of a QAOA approach.',
    conceptualMappingQuality: 'The problem was mapped to an Ising model, which is a standard input for QAOA. The mapping appears to be sound from a theoretical perspective.',
    observed: {
      '10110': 150,
      '01001': 120,
      '11110': 80,
    },
    inferredSolution: '10110',
    uncertainty: 'High. The result is based on a limited number of "shots" from a noisy simulation.'
  }
};
