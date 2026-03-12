
import { mockApi } from '../mocks/api';

// --- Configuration ---

// Default to 'mock' mode to allow for frictionless UI development.
// 'backend' mode can be enabled for end-to-end testing via environment variable.
const API_MODE = process.env.REACT_APP_API_MODE || 'mock'; // 'mock' or 'backend'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api/v1';

// --- Backend API Client ---

const backendApi = {
  createSession: async (req) => {
    const response = await fetch(`${BACKEND_URL}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  uploadDataset: async (req) => {
    const response = await fetch(`${BACKEND_URL}/sessions/dataset`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
  },

  getRecommendation: async (req) => {
    const response = await fetch(`${BACKEND_URL}/sessions/${req.sessionId}/recommendation`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  submitJob: async (req) => {
    const response = await fetch(`${BACKEND_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  getJobStatus: async (jobId) => {
    const response = await fetch(`${BACKEND_URL}/jobs/${jobId}/status`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  getResults: async (jobId) => {
    const response = await fetch(`${BACKEND_URL}/jobs/${jobId}/results`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  getHistory: async () => {
    const response = await fetch(`${BACKEND_URL}/history`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },
};

// --- Export the appropriate API implementation ---

export const api = API_MODE === 'backend' ? backendApi : mockApi;
