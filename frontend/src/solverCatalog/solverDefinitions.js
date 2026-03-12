
export const solvers = [
  {
    id: 'classical_baseline',
    name: 'Classical Baseline Solver',
    category: 'classical',
    maturity: 'production-ready',
    description: 'A standard, well-understood classical algorithm for optimization problems. It serves as a reliable baseline for performance and solution quality comparison.',
    suitableProblemTypes: ['Combinatorial Optimization', 'Linear Programming', 'Graph Problems'],
    requiredInputs: { 
      cost_matrix: '2D array of costs',
      constraints: 'Array of constraint objects'
    },
    strengths: [
      'Fast and computationally efficient for many problem sizes.',
      'Guaranteed to find the optimal solution for certain problem classes (e.g., convex problems).',
      'Mature and well-documented with extensive library support.'
    ],
    weaknesses: [
      'May get stuck in local optima for complex, non-convex problems.',
      'Performance can degrade significantly as problem size and complexity increase.'
    ],
    interpretability: 'High. The steps and decisions of the algorithm are generally easy to follow and understand.',
    executionNotes: 'This solver runs on a standard CPU environment. No special hardware is required.',
    uiLabel: 'Classical Baseline',
    recommendedWhen: [
      'The problem is well-understood and has a known classical solution method.',
      'A quick and reliable baseline is needed for comparison.',
      'Computational resources are limited.'
    ],
    notRecommendedWhen: [
      'The problem landscape is highly complex and known to have many local optima.',
      'Exploring novel solution approaches is a primary goal.',
      'The problem size exceeds the practical limits of classical hardware.'
    ],
    enabled: true,
    runtimeStatus: 'active-backend',
    referenceCodePath: '04_solvers/reference_code/python/classical_placeholder.py',
    activeExecutionPath: 'Firebase Cloud Function: `startExecution` -> `finalizeExecution`',
  },
  {
    id: 'quantum_inspired_annealing',
    name: 'Quantum-Inspired Annealing',
    category: 'hybrid',
    maturity: 'runnable',
    description: 'A quantum-inspired algorithm that mimics the principles of quantum annealing to find good solutions to complex optimization problems. It runs on classical hardware but uses quantum principles to escape local optima.',
    suitableProblemTypes: ['Combinatorial Optimization', 'QUBO (Quadratic Unconstrained Binary Optimization)'],
    requiredInputs: {
      qubo_matrix: 'A square matrix representing the QUBO formulation of the problem.'
    },
    strengths: [
      'More effective at escaping local optima than purely classical approaches.',
      'Can handle larger and more complex problems than current quantum hardware.',
      'Provides a bridge between classical and quantum computing.'
    ],
    weaknesses: [
      'Not guaranteed to find the globally optimal solution.',
      'Performance can be sensitive to parameter tuning.',
      'The quality of the solution can vary between runs.'
    ],
    interpretability: 'Medium. While the high-level concept is understandable, the specific dynamics of the annealing process can be complex to trace.',
    executionNotes: 'This is a simulation that runs on classical hardware, but is designed to model the behavior of a quantum annealer.',
    uiLabel: 'Quantum-Inspired Annealer',
    recommendedWhen: [
      'The problem is a complex optimization task where finding a good solution is more important than finding the absolute best solution.',
      'You want to explore quantum-like approaches without requiring access to quantum hardware.'
    ],
    notRecommendedWhen: [
      'A guaranteed optimal solution is required.',
      'The problem can be solved efficiently with a classical baseline solver.'
    ],
    enabled: true,
    runtimeStatus: 'reference-only',
    referenceCodePath: '04_solvers/reference_code/python/quantum_inspired_annealing_placeholder.py',
    activeExecutionPath: 'N/A',
  },
  {
    id: 'qaoa_candidate',
    name: 'QAOA Candidate',
    category: 'quantum',
    maturity: 'prototype',
    description: 'The Quantum Approximate Optimization Algorithm (QAOA) is a hybrid quantum-classical algorithm for finding approximate solutions to combinatorial optimization problems. This is a candidate implementation for future execution on real quantum hardware.',
    suitableProblemTypes: ['Combinatorial Optimization', 'Max-Cut'],
    requiredInputs: {
      graph: 'A graph structure representing the problem.',
      p: 'The number of layers in the QAOA circuit.'
    },
    strengths: [
      'Has the potential to show quantum advantage for certain types of problems.',
      'Is a leading candidate for near-term quantum computers.'
    ],
    weaknesses: [
      'Currently limited by the number of qubits and gate fidelity of available quantum hardware.',
      'Performance is highly dependent on the choice of parameters (p) and the classical optimization loop.',
      'The quality of the solution is not guaranteed and can be noisy.'
    ],
    interpretability: 'Low. The quantum mechanics of the algorithm are not intuitive, and the results can be difficult to interpret.',
    executionNotes: 'This is a prototype for running on a quantum simulator or future quantum hardware. It is not yet ready for production use.',
    uiLabel: 'QAOA (Exploratory)',
    recommendedWhen: [
      'Exploring the potential of quantum algorithms for a specific problem.',
      'The problem is small enough to be run on current quantum simulators or hardware.',
      'The goal is research and learning, rather than finding a production-ready solution.'
    ],
    notRecommendedWhen: [
      'A reliable and optimal solution is required for a production system.',
      'The problem is large and cannot be mapped to the available number of qubits.'
    ],
    enabled: true,
    runtimeStatus: 'exploratory-placeholder',
    referenceCodePath: '04_solvers/reference_code/python/qaoa_placeholder.py',
    activeExecutionPath: 'N/A',
  },
];
