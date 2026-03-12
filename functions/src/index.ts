import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";

admin.initializeApp();

const corsHandler = cors({ origin: true });

export const createSessionFromGoal = functions.https.onCall(async (data, context) => {
  const { goal } = data;
  const userId = context.auth?.uid || null;

  if (!goal || typeof goal !== 'string' || goal.trim().length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a non-empty "goal" string.');
  }

  try {
    const session = {
      userId,
      title: `New Session: ${goal.substring(0, 20)}...`,
      goal,
      status: 'new',
      currentStage: 'goal',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const sessionRef = await admin.firestore().collection('sessions').add(session);

    return { sessionId: sessionRef.id };
  } catch (error) {
    console.error("Error creating session:", error);
    throw new functions.https.HttpsError('internal', 'Failed to create a new session.');
  }
});