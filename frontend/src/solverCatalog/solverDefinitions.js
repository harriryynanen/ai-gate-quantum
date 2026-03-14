
export const solvers = [
  // --- Classical Solvers --- //
  {
    id: 'classical_baseline',
    name: 'Classical Baseline Solver',
    uiLabel: 'Classical Baseline',
    category: 'classical',
    maturity: 'production',
    description: 'A standard, well-established classical algorithm for solving optimization problems. It serves as a baseline to compare the performance of more advanced solvers.',
    suitableProblemTypes: ['Linear Programming', 'Integer Programming', 'Combinatorial Optimization'],
    requiredInputs: {
      objective_function: 'The function to be minimized or maximized.',
      constraints: 'A set of linear or non-linear constraints.'
    },
    strengths: [
      'Guaranteed to find the optimal solution for convex problems.',
      'Fast and efficient for a wide range of problems.',
      'Highly mature and well-understood technology.'
    ],
    weaknesses: [
      'May struggle with very large or complex non-convex problems.',
      'Can get stuck in local optima for non-convex landscapes.'
    ],
    notRecommendedWhen: [
      'The problem space is known to be highly non-convex with many local minima.',
      'The problem requires exploring quantum phenomena for a solution.'
    ],
    enabled: true,
    runtimeStatus: 'runnable',
    referenceCodePath: 'backend/solvers/classical/baseline_solver.py',
    activeExecutionPath: 'N/A', 
  },
  {
    id: 'linear_regression',
    name: 'Linear Regression Analyzer',
    uiLabel: 'Linear Regression',
    category: 'classical',
    maturity: 'production',
    description: 'A statistical method for modeling the relationship between a dependent variable and one or more independent variables. It is a foundational tool in predictive analytics.',
    suitableProblemTypes: ['Predictive Modeling', 'Data Analysis', 'Forecasting'],
    requiredInputs: {
      dataset: 'A structured dataset with a target variable and feature variables.',
      target_variable: 'The variable to be predicted.'
    },
    strengths: [
      'Simple to interpret and explain.',
      'Computationally inexpensive.',
      'Provides a good baseline for more complex models.'
    ],
    weaknesses: [
      'Assumes a linear relationship between variables.',
      'Sensitive to outliers.',
      'May not capture complex patterns in the data.'
    ],
    notRecommendedWhen: [
      'The underlying relationship is known to be non-linear.',
      'The data contains significant noise or outliers that have not been addressed.'
    ],
    enabled: true,
    runtimeStatus: 'runnable',
    referenceCodePath: 'backend/solvers/classical/linear_regression.py',
    activeExecutionPath: 'N/A',
  },

  // --- Hybrid Solvers --- //
  {
    id: 'vqe_prototype',
    name: 'Variational Quantum Eigensolver (VQE) Prototype',
    uiLabel: 'VQE (Prototype)',
    category: 'hybrid',
    maturity: 'prototype',
    description: 'A hybrid quantum-classical algorithm used to find the lowest eigenvalue of a Hamiltonian. This prototype simulates the process and is intended for educational and validation purposes.',
    suitableProblemTypes: ['Quantum Chemistry', 'Materials Science', 'Optimization'],
    requiredInputs: {
      hamiltonian: "A mathematical description of the system's energy (Hamiltonian).",
      ansatz: 'A parameterized quantum circuit that prepares a trial wavefunction.'
    },
    strengths: [
      'Can leverage both classical and quantum resources.',
      'Potentially capable of solving problems intractable for classical computers.',
      'More resilient to noise than some other quantum algorithms.'
    ],
    weaknesses: [
      'The simulation does not run on actual quantum hardware.',
      'The choice of ansatz is crucial and can be difficult.',
      'Optimization can be challenging.'
    ],
    notRecommendedWhen: [
      'A production-ready solution is required.',
      'The problem does not have a well-defined Hamiltonian.'
    ],
    enabled: true,
    runtimeStatus: 'runnable',
    referenceCodePath: 'backend/solvers/hybrid/vqe_prototype.py',
    activeExecutionPath: 'N/A',
  },

  // --- Quantum Solvers --- //
   {
    id: 'grover_search',
    name: "Grover's Search Algorithm",
    uiLabel: 'Grover Search (Sim)',
    category: 'quantum',
    maturity: 'simulator',
    description: 'A well-known quantum algorithm that provides a quadratic speedup for unstructured search problems. It can find a "marked" item in a list of N items in approximately sqrt(N) steps.',
    suitableProblemTypes: ['Unstructured Search', 'Database Querying', 'Cryptography'],
    requiredInputs: {
      oracle: 'A "black box" function that identifies the marked item.',
      num_qubits: 'The number of qubits needed to represent the search space.'
    },
    strengths: [
      'Provable quantum speedup for its specific problem type.',
      'Demonstrates a fundamental quantum computing principle.'
    ],
    weaknesses: [
      'Requires the construction of a problem-specific oracle.',
      'The speedup is only quadratic.',
      'Highly sensitive to noise on real quantum hardware.'
    ],
    notRecommendedWhen: [
      'The problem has structure that can be exploited by classical algorithms.',
      'The problem does not have a clear "marked item" or oracle.',
      'A production-ready search solution is required.'
        ],
        enabled: true,
        runtimeStatus: 'simulator',
        referenceCodePath: 'backend/solvers/quantum/grover_search.py',
        activeExecutionPath: 'N/A',
      },
      {
        id: 'quantum_inspired_annealing',
        name: 'Quantum-Inspired Annealing',
        uiLabel: 'QI Annealing',
        category: 'hybrid',
        maturity: 'runnable',
        description: 'A quantum-inspired algorithm that mimics the principles of quantum annealing to find good solutions to complex optimization problems. It runs on classical hardware but uses quantum principles to escape local optima.',
        suitableProblemTypes: ['Combinatorial Optimization', 'QUBO (Quadratic Unconstrained Binary Optimization)'],
        requiredInputs: {
          qubo_matrix: 'A square matrix representing the QUBO formulation of the problem.'
        },
        strengths: [
          'More effective at escaping local optima than purely classical approaches.',
          'Can handle very large and complex problems.'
        ],
        weaknesses: [
          'Does not guarantee finding the absolute global optimum.',
          'Performance can be sensitive to hyperparameter tuning.'
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
        uiLabel: 'QAOA (Candidate)',
        category: 'quantum',
        maturity: 'prototype',
        description: 'The Quantum Approximate Optimization Algorithm (QAOA) is a hybrid quantum-classical algorithm for finding approximate solutions to combinatorial optimization problems. This is a candidate implementation for future execution on real quantum hardware.',
        suitableProblemTypes: ['Combinatorial Optimization', 'Max-Cut'],
        requiredInputs: {
          graph: 'A graph structure representing the problem.',
          p: 'The number of layers in the QAOA circuit.'
        },
        strengths: [
          'Shows promise for achieving quantum advantage in optimization.',
          'Adaptable to different problem types.'
        ],
        weaknesses: [
      'Currently in a prototype stage; not ready for production use.',
      'Performance depends heavily on the classical optimization loop.',
      'Requires a quantum computer to run effectively.'
    ],
    notRecommendedWhen: [
      'A production-ready or guaranteed optimal solution is needed.',
      'The problem does not map well to a QAOA formulation.'
        ],
        enabled: false,
        runtimeStatus: 'prototype',
        referenceCodePath: '04_solvers/reference_code/python/qaoa_candidate_placeholder.py',
        activeExecutionPath: 'N/A',
      }
];
