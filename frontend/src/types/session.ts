
export interface Session {
  id: string;
  title: string;
  goal: string;
  createdAt: string;
  dataset: Dataset | null;
  job: Job | null;
}

export interface Dataset {
  id: string;
  name: string;
  columns: { name: string; type: 'number' | 'string' | 'date' }[];
  rowCount: number;
}

export interface Job {
  id: string;
  status: 'pending' | 'running' | 'complete' | 'failed';
  config: JobConfig;
  results: Results | null;
}

export interface JobConfig {
  method: SolverMethod;
  parameters: Record<string, any>;
}

export interface SolverMethod {
  id: string;
  name: string;
  type: 'classical' | 'quantum_simulation' | 'quantum_real';
}

export interface Results {
  id: string;
  summary: string;
  rawOutput: Record<string, any>;
}
