export const solvers = [
  {
    id: 'classical-baseline',
    name: 'Classical Baseline Optimizer',
    type: 'Classical',
    version: '2.1.0',
    maturity: 'Production-Ready',
    description: 'A standard, deterministic solver that provides a reliable baseline for comparison. Ideal for well-understood problems.',
    inputs: [
      { name: 'Objective Function', type: 'Mathematical expression' },
      { name: 'Constraints', type: 'List of equations' },
    ],
    outputs: [
      { name: 'Optimal Solution', type: 'Vector' },
      { name: 'Objective Value', type: 'Float' },
    ],
    suitability: 'Use for benchmarking, simple optimization tasks, and when interpretability is critical.',
  },
  {
    id: 'simulated-annealing',
    name: 'Simulated Quantum Annealer',
    type: 'Quantum',
    version: '0.8.2',
    maturity: 'Exploratory',
    description: 'A simulated quantum annealer for exploring complex solution spaces. Suitable for combinatorial optimization problems where classical methods struggle.',
    inputs: [
      { name: 'Ising Model Hamiltonian', type: 'QUBO/Ising' },
      { name: 'Number of Reads', type: 'Integer' },
    ],
    outputs: [
      { name: 'Lowest Energy State', type: 'Spin vector' },
      { name: 'Energy Distribution', type: 'Histogram' },
    ],
    suitability: 'Good for problems that can be mapped to a QUBO formulation, like graph problems or financial modeling.',
  },
  {
    id: 'hybrid-solver-v1',
    name: 'Hybrid Solver v1',
    type: 'Hybrid',
    version: '1.0.0-beta',
    maturity: 'Beta',
    description: 'A hybrid quantum-classical solver that leverages quantum techniques to enhance classical machine learning models.',
    inputs: [
      { name: 'Training Data', type: 'Matrix' },
      { name: 'Kernel Function', type: 'Quantum Kernel' },
    ],
    outputs: [
      { name: 'Trained Model', type: 'Serialized object' },
      { name: 'Classification Report', type: 'JSON' },
    ],
    suitability: 'Use for classification or regression tasks where data has complex, high-dimensional correlations.',
  },
];
