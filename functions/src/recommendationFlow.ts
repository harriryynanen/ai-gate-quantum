import { flow } from "@genkit-ai/core";
import { proModel, RecommendationSchema } from "./genkit";
import * as z from "zod";

const SystemInstruction = `You are an expert advisor for QuantumFlow, a quantum-first, AI-guided workflow application.
Your role is to analyze a user's stated goal and recommend whether a quantum or classical approach is more suitable.

You must act as an impartial expert, not a salesperson for quantum computing.
Do not over-promise quantum advantage. Be realistic and pragmatic.

Your evaluation must be based on these criteria:
1.  **Problem Type:** Is this an optimization, simulation, factorization, or other class of problem?
2.  **Data Readiness:** Can the problem be formulated with the likely data available? (Rate as high, medium, or low).
3.  **Quantum Fit:** Is there a known quantum algorithm that could apply? 
    Is the problem size and structure amenable to current or near-term quantum capabilities (even if simulated)?
4.  **Classical Fit:** Is this problem well-solved by established classical algorithms? 
    Are classical methods more practical, cheaper, or faster for this specific case?
5.  **Production vs. Exploration:** Is the recommended approach ready for production use, or is it purely exploratory and for research purposes?

You must return your recommendation in the specified JSON format and adhere to the schema.
- If quantum is recommended, it might still be exploratory.
- If classical is recommended, explain clearly why it is the more pragmatic choice.
- If there is not enough information, state that clearly.
- Always list your assumptions and potential blockers.
`;

export const generateRecommendationFlow = flow(
  {
    name: "generateRecommendationFlow",
    inputSchema: z.object({ goal: z.string() }),
    outputSchema: RecommendationSchema,
  },
  async (input) => {
    const { goal } = input;
    try {
      const llmResponse = await proModel.generate({
        system: SystemInstruction,
        prompt: `Analyze the following user goal and provide a structured recommendation: "${goal}"`,
        output: {
          schema: RecommendationSchema,
        },
      });

      const recommendation = llmResponse.output();
      if (!recommendation) {
        throw new Error("No output from model");
      }

      return recommendation;
    } catch (error) {
      console.error("Error generating recommendation from Gemini. Falling back to deterministic response.", error);

      // Fallback behavior
      return {
        problemType: "Unknown",
        dataReadiness: "low",
        recommendedPath: "classical",
        alternativePath: "quantum",
        recommendationStrength: "low",
        confidence: 0.2,
        reasoningSummary: "The AI recommendation engine is currently unavailable. This is a default fallback recommendation. We suggest starting with a classical approach as a baseline.",
        quantumFitRationale: "Quantum suitability could not be assessed. A quantum approach may be possible for certain problem types, but requires careful analysis.",
        classicalFitRationale: "Classical methods are well-understood and provide a reliable starting point for most problems. They serve as an excellent benchmark.",
        tradeoffs: "Fallback mode: Cannot assess tradeoffs accurately.",
        assumptions: ["The primary AI model is unavailable.", "A classical approach is a safe default."],
        blockers: ["AI model connection error."],
        requiredInputs: ["A clear problem definition.", "Structured data for the chosen method."],
        overrideAllowed: true,
        explorationVsProduction: "insufficient-information",
        recommendationWarnings: ["This is a fallback recommendation due to a system error. Its accuracy is limited."],
      };
    }
  },
);
