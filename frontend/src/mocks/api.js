
import {
  mockExecution
} from './mockData';

// Mock database
const MOCK_SESSIONS = {};
const MOCK_DATASETS = {};
const MOCK_JOBS = {};

// --- MOCK API IMPLEMENTATION ---

export const mockApi = {
  createSession: async (req) => {
    const id = `session-${Date.now()}`;
    const newSession = {
      id,
      title: 'New Session',
      goal: req.goal,
      createdAt: new Date().toISOString(),
      // Add a default dataset for immediate UX
      dataset: {
        id: 'data-default',
        name: 'Default Risk Data.csv',
        columns: [{ name: 'TransactionID', type: 'string' }, { name: 'Amount', type: 'number' }, { name: 'RiskScore', type: 'number' }],
        rowCount: 1000,
      },
      job: null,
    };
    MOCK_SESSIONS[id] = newSession;
    return newSession;
  },

  uploadDataset: async (req) => {
    const {
      sessionId,
      dataset
    } = req;
    const datasetId = `data-${Date.now()}`;
    const newDataset = { ...dataset,
      id: datasetId
    };
    MOCK_DATASETS[datasetId] = newDataset;
    MOCK_SESSIONS[sessionId].dataset = newDataset;
    return MOCK_SESSIONS[sessionId];
  },

  getRecommendation: async (req) => {
    // Enhanced recommendation payload
    return {
      confidence: 0.92,
      justification: 'The problem structure (high-dimensional, combinatorial) is an excellent match for quantum-inspired annealing algorithms, which can explore vast solution spaces more effectively than classical solvers.',
      recommendedMethod: {
        id: 'quantum_inspired_annealing',
        name: 'Quantum-Inspired Annealing',
        type: 'quantum_simulation',
        advantages: ['Superior performance on complex problems', 'Finds non-obvious solutions', 'Handles uncertainty well'],
        exploratory: false,
      },
      alternateMethod: {
        id: 'classical_optimization',
        name: 'Classical Optimization (Monte Carlo)',
        type: 'classical',
        reasoning: 'A robust and well-understood classical method. It is faster for smaller datasets but may miss optimal solutions in highly complex scenarios. Recommended for baseline comparisons.',
      },
    };
  },

  submitJob: async (req) => {
    const {
      sessionId,
      config
    } = req;
    const jobId = `job-${Date.now()}`;
    const newJob = {
      id: jobId,
      status: 'running',
      config,
      results: null,
    };
    MOCK_JOBS[jobId] = newJob;
    MOCK_SESSIONS[sessionId].job = newJob;
    return MOCK_SESSIONS[sessionId];
  },

  getJobStatus: async (jobId) => {
    const job = MOCK_JOBS[jobId];
    if (!job) return {
      status: 'failed',
      timeline: [],
      logs: []
    };

    return {
      status: job.status,
      ...mockExecution,
    };
  },

  getResults: async (jobId) => {
    const job = MOCK_JOBS[jobId];
    if (!job) return null;

    if (job.status !== 'complete') {
      job.status = 'complete';
      job.results = {
        id: `res-${job.id}`,
        summary: 'The quantum-inspired model identified a portfolio allocation that significantly reduces downside risk while capturing 95% of the potential upside, outperforming the classical baseline.',
        rawOutput: {
          optimal_weights: {
            'Quantum-Fund-A': 0.65,
            'Stable-Growth-B': 0.35
          },
          sharpe_ratio: 2.8
        },
      };
    }
    return job.results;
  },

  getHistory: async () => {
    return Object.values(MOCK_SESSIONS);
  },
};
