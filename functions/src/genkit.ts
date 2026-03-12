import { genkit } from "@genkit-ai/core";
import { firebase } from "@genkit-ai/firebase";
import { googleAI, gemini15Pro } from "@genkit-ai/googleai";
import * as z from "zod";

genkit({
  plugins: [
    firebase(),
    googleAI({ apiKey: process.env.GEMINI_API_KEY }),
  ],
  logLevel: "debug",
  enableTracingAndMetrics: true,
});

export const proModel = gemini15Pro;

export const RecommendationSchema = z.object({
  problemType: z.string().describe("e.g., optimization, simulation, factorization"),
  dataReadiness: z.enum(["high", "medium", "low"]).describe("How ready is the data for the problem?"),
  recommendedPath: z.enum(["classical", "quantum", "hybrid"]).describe("The recommended primary approach"),
  alternativePath: z.enum(["classical", "quantum", "hybrid"]).optional().describe("An alternative to consider"),
  recommendationStrength: z.enum(["high", "medium", "low"]).describe("Confidence in the recommendation"),
  confidence: z.number().min(0).max(1).describe("Numerical confidence score (0.0 to 1.0)"),
  reasoningSummary: z.string().describe("A high-level summary of the reasoning behind the recommendation"),
  quantumFitRationale: z.string().describe("Why a quantum approach is or is not suitable"),
  classicalFitRationale: z.string().describe("Why a classical approach is or is not suitable"),
  tradeoffs: z.string().describe("Key tradeoffs between the quantum and classical paths"),
  assumptions: z.array(z.string()).describe("Assumptions made during the analysis"),
  blockers: z.array(z.string()).describe("Potential blockers for the recommended path"),
  requiredInputs: z.array(z.string()).describe("Specific inputs needed to proceed"),
  overrideAllowed: z.boolean().describe("Whether the user should be permitted to override the recommendation"),
  explorationVsProduction: z.enum(["exploration", "production-ready", "insufficient-information"]).describe("Whether this is for research or production"),
  recommendationWarnings: z.array(z.string()).optional().describe("Any warnings to surface to the user"),
});
