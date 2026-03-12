
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
      dataset: null,
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
    return {
      recommendedMethod: {
        id: 'quantum_inspired_annealing',
        name: 'Quantum-Inspired Annealing',
        type: 'quantum_simulation',
      },
      alternateMethod: {
        id: 'classical_optimization',
        name: 'Classical Optimization',
        type: 'classical',
      },
      reasoning: 'The problem structure is suitable for quantum-inspired methods, which can explore a larger solution space.',
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
    // Simulate progress
    const job = MOCK_JOBS[jobId];
    if (!job) return {
      status: 'failed',
      timeline: [],
      logs: []
    };

    return {
      status: job.status,
      ...mockExecution, // Re-use timeline and logs from old mock
    };
  },

  getResults: async (jobId) => {
    const job = MOCK_JOBS[jobId];
    if (!job) return null;

    if (job.status !== 'complete') {
      // Simulate job completion
      job.status = 'complete';
      job.results = {
        id: `res-${job.id}`,
        summary: 'The model suggests a portfolio heavily weighted towards tech and healthcare.',
        rawOutput: {
          optimal_weights: {
            AAPL: 0.4,
            MSFT: 0.6
          },
          sharpe_ratio: 2.1
        },
      };
    }
    return job.results;
  },

  getHistory: async () => {
    return Object.values(MOCK_SESSIONS);
  },
};
