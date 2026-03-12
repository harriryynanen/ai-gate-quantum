import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { runFlow } from "@genkit-ai/core";
import { generateRecommendationFlow } from "./recommendationFlow";

// Initialize Firebase Admin
admin.initializeApp();

// Callable function to create a session
export const createSessionFromGoal = onCall(async (request) => {
  const data = request.data;
  const goal = data.goal as string;
  const userId = request.auth?.uid || null;

  if (!goal || typeof goal !== "string" || goal.trim().length === 0) {
    throw new HttpsError("invalid-argument", "The function must be called with a non-empty \"goal\" string.");
  }

  try {
    const session = {
      userId,
      title: `New Session: ${goal.substring(0, 20)}...`,
      goal,
      status: "new",
      currentStage: "goal",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const sessionRef = await admin.firestore().collection("sessions").add(session);
    return { sessionId: sessionRef.id };
  } catch (error) {
    console.error("Error creating session:", error);
    throw new HttpsError("internal", "Failed to create a new session.");
  }
});

// Callable function to generate a recommendation
export const generateRecommendation = onCall(async (request) => {
  const data = request.data;
  const sessionId = data.sessionId as string;
  if (!sessionId) {
    throw new HttpsError("invalid-argument", "Session ID is required.");
  }

  const sessionRef = admin.firestore().collection("sessions").doc(sessionId);
  const sessionDoc = await sessionRef.get();

  if (!sessionDoc.exists) {
    throw new HttpsError("not-found", "Session not found.");
  }

  const goal = sessionDoc.data()?.goal as string;
  if (!goal) {
    throw new HttpsError("failed-precondition", "Session has no goal.");
  }

  try {
    // Run the Genkit flow
    const recommendation = await runFlow(generateRecommendationFlow, { goal });

    // Save the structured recommendation to a new document
    const recommendationRef = await admin.firestore().collection("recommendations").add({
      sessionId,
      ...recommendation,
      generatedAt: admin.firestore.FieldValue.serverTimestamp(),
      source: recommendation.recommendationWarnings?.includes("This is a fallback recommendation due to a system error. Its accuracy is limited.")
        ? "fallback"
        : "gemini-1.5-pro",
    });

    // Update the session with the new recommendation ID
    await sessionRef.update({
      recommendationId: recommendationRef.id,
      status: "new", // Reset status as we enter the next phase
      currentStage: "method",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { recommendationId: recommendationRef.id };
  } catch (error) {
    console.error("Error in generateRecommendation function:", error);
    await sessionRef.update({ status: "error", updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    throw new HttpsError("internal", "Failed to generate recommendation.");
  }
});
