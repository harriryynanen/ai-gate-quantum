
import { mockApi } from '../mocks/api';

// This is the actual API service the frontend will use.
// For now, it's a thin wrapper around the mock API.
// In the future, this will be replaced with actual HTTP requests.

export const api = {
  createSession: (req) => mockApi.createSession(req),
  uploadDataset: (req) => mockApi.uploadDataset(req),
  getRecommendation: (req) => mockApi.getRecommendation(req),
  submitJob: (req) => mockApi.submitJob(req),
  getJobStatus: (jobId) => mockApi.getJobStatus(jobId),
  getResults: (jobId) => mockApi.getResults(jobId),
  getHistory: () => mockApi.getHistory(),
};
