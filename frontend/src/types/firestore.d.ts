
import { Timestamp } from 'firebase/firestore';

/**
 * Represents a single analysis session in QuantumFlow.
 */
export interface Session {
  id: string;
  userId?: string | null;
  title: string;
  goal: string;
  status: 'new' | 'running' | 'completed' | 'error';
  currentStage: 'goal' | 'data' | 'method' | 'job' | 'execute' | 'results';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  selectedPath?: 'quantum' | 'classical' | null;
  selectedMethod?: string | null;
  recommendationId?: string | null;
  executionId?: string | null;
  resultId?: string | null;
}

/**
 * Stores the AI-generated recommendation for a session.
 */
export interface Recommendation {
  id: string;
  sessionId: string;
  recommendedPath: 'quantum' | 'classical';
  alternativePath: 'quantum' | 'classical';
  recommendationStrength: 'high' | 'medium' | 'low';
  confidence: number; // e.g., 0.0 to 1.0
  reasoningSummary: string;
  tradeoffs: string;
  assumptions: string;
  blockers: string;
  requiredInputs: string[];
  overrideAllowed: boolean;
  explorationVsProduction: 'exploration' | 'production';
}

/**
 * Tracks the state of a job execution.
 */
export interface Execution {
  id: string;
  sessionId: string;
  method: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  progress: number; // 0 to 100
  startedAt?: Timestamp | null;
  finishedAt?: Timestamp | null;
  logEntries: LogEntry[];
}

export interface LogEntry {
  timestamp: Timestamp;
  message: string;
  level: 'info' | 'warn' | 'error';
}

/**
 * Stores the results of a completed execution.
 */
export interface Result {
  id: string;
  sessionId: string;
  summary: string;
  metrics: { [key: string]: number | string };
  interpretation: string;
  nextActions: string[];
  createdAt: Timestamp;
}
