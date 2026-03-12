
export type SolverCategory = "classical" | "hybrid" | "quantum";

export type SolverMaturity = "concept" | "prototype" | "runnable" | "production-ready";

export interface Solver {
  id: string;
  name: string;
  category: SolverCategory;
  maturity: SolverMaturity;
  description: string;
  suitableProblemTypes: string[];
  requiredInputs: object;
  strengths: string[];
  weaknesses: string[];
  interpretability: string;
  executionNotes: string;
  uiLabel: string;
  recommendedWhen: string[];
  notRecommendedWhen: string[];
  enabled: boolean;
}
