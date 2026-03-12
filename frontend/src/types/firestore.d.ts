
import { Timestamp } from "firebase/firestore";

// Main session document
export interface Session {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
  title: string;
  goal: string;
  status: "active" | "completed" | "archived";
  currentStage: "data" | "config" | "execution" | "results";
  selectedPath?: "recommended" | "alternative";
  selectedMethod?: Method;
  comparisonModeEnabled?: boolean;
}

// Represents a specific method for analysis
export interface Method {
    id: string;
    name: string;
    type: "quantum_simulation" | "quantum_inspired" | "classical";
    description: string;
}

// Documents the recommendation given by the AI
export interface Recommendation {
  id: string; // Same as sessionId
  recommendedPath: {
      method: Method;
      reasoning: string;
      tradeoffs: Record<string, string>;
  };
  alternativePath: {
      method: Method;
      reasoning: string;
      tradeoffs: Record<string, string>;
  };
  confidence: number;
  status: "strongly_justified" | "exploratory" | "not_recommended";
  reasoningSummary: string;
  assumptions: string[];
}

// Tracks the status of a running job
export interface Execution {
  id: string; // Same as sessionId
  method: Method;
  status: "queued" | "preparing" | "running" | "completed" | "failed";
  progress: number;
  startedAt?: Timestamp;
  finishedAt?: Timestamp;
  logEntries: LogEntry[];
}

export interface LogEntry {
    timestamp: Timestamp;
    message: string;
    level: "info" | "warn" | "error";
}

// Stores the final results of an execution
export interface Result {
  id: string; // Same as sessionId
  summary: string;
  interpretation: string;
  nextActions: string[];
  metrics: Record<string, any>;
  rawOutput: Record<string, any>;
  method: Method;
}
