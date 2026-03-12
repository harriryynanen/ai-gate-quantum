
import { Session, Dataset, JobConfig, Results, SolverMethod } from './session';

// API Request Payloads
export interface CreateSessionRequest {
  goal: string;
}

export interface UploadDatasetRequest {
  sessionId: string;
  dataset: Omit<Dataset, 'id'>;
}

export interface GetRecommendationRequest {
  sessionId: string;
}

export interface SubmitJobRequest {
  sessionId: string;
  config: JobConfig;
}

// API Response Payloads
export type CreateSessionResponse = Session;

export type UploadDatasetResponse = Session;

export interface GetRecommendationResponse {
  recommendedMethod: SolverMethod;
  alternateMethod: SolverMethod;
  reasoning: string;
}

export type SubmitJobResponse = Session;

export interface GetJobStatusResponse {
  status: Job['status'];
  timeline: { name: string; status: string; stage: number }[];
  logs: { time: string; stage: number; message: string }[];
}

export type GetResultsResponse = Results;

export type GetHistoryResponse = Session[];
