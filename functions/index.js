const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * Creates a new session document in Firestore based on a user's goal.
 */
exports.createSessionFromGoal = functions.https.onCall(async (data, context) => {
  const { goal } = data;
  const userId = context.auth?.uid || "anonymous"; // Default to anonymous if not authenticated

  if (!goal || typeof goal !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with a "goal" string.');
  }

  const newSessionRef = db.collection("sessions").doc();
  const now = admin.firestore.FieldValue.serverTimestamp();

  const sessionData = {
    id: newSessionRef.id,
    createdAt: now,
    updatedAt: now,
    userId: userId,
    title: `Session for: ${goal.substring(0, 40)}...`,
    goal: goal,
    status: "active",
    currentStage: "data",
  };

  await newSessionRef.set(sessionData);

  return { id: newSessionRef.id, ...sessionData };
});

/**
 * Generates a mock recommendation and saves it to Firestore.
 */
exports.generateRecommendation = functions.https.onCall(async (data, context) => {
    const { sessionId } = data;
    if (!sessionId) {
        throw new functions.https.HttpsError('invalid-argument', 'Session ID is required.');
    }

    // This is placeholder logic. In the future, this would call a real model.
    const mockRecommendation = {
        id: sessionId,
        recommendedPath: {
            method: {
                id: 'quantum_inspired_annealing',
                name: 'Quantum-Inspired Annealing',
                type: 'quantum_simulation',
                description: 'A quantum-inspired algorithm...'
            },
            reasoning: 'Problem structure appears combinatorial and high-dimensional.',
            tradeoffs: { 'Solution Quality': 'High', 'Speed': 'Medium' }
        },
        alternativePath: {
            method: {
                id: 'classical_optimization',
                name: 'Classical Optimization',
                type: 'classical',
                description: 'A traditional, robust approach...'
            },
            reasoning: 'Provides a reliable and fast baseline.',
            tradeoffs: { 'Solution Quality': 'Medium', 'Speed': 'Very High' }
        },
        confidence: 0.88,
        status: 'strongly_justified',
        reasoningSummary: 'The analysis points towards a problem that is well-suited for quantum-inspired methods due to its complex search space.',
        assumptions: ['Data represents a combinatorial problem.'],
    };

    await db.collection("recommendations").doc(sessionId).set(mockRecommendation);
    await db.collection("sessions").doc(sessionId).update({ updatedAt: admin.firestore.FieldValue.serverTimestamp(), currentStage: 'config' });

    return mockRecommendation;
});

/**
 * Initiates a mock execution lifecycle.
 */
exports.startExecution = functions.https.onCall(async (data, context) => {
    const { sessionId } = data;
    if (!sessionId) {
        throw new functions.https.HttpsError('invalid-argument', 'Session ID is required.');
    }

    const sessionDoc = await db.collection("sessions").doc(sessionId).get();
    if (!sessionDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'Session not found.');
    }

    const now = admin.firestore.FieldValue.serverTimestamp();
    const executionData = {
        id: sessionId,
        method: sessionDoc.data().selectedMethod,
        status: 'queued',
        progress: 0,
        startedAt: now,
        logEntries: [{ timestamp: now, message: 'Execution initiated and queued.', level: 'info' }]
    };

    await db.collection("executions").doc(sessionId).set(executionData);
    await db.collection("sessions").doc(sessionId).update({ updatedAt: now, currentStage: 'execution' });

    // Simulate the execution lifecycle with delayed function calls (placeholder)
    // In a real app, this would be handled by separate, state-triggered functions or external workers.
    setTimeout(() => appendLog(sessionId, 'Preparing environment...', 'info', 25), 2000);
    setTimeout(() => appendLog(sessionId, 'Solver running...', 'info', 50, 'running'), 4000);
    setTimeout(() => appendLog(sessionId, 'Convergence detected. Finalizing results.', 'info', 90), 8000);
    setTimeout(() => finalizeExecution(sessionId), 10000);

    return executionData;
});

// --- Helper Functions (not directly callable from client) ---

async function appendLog(sessionId, message, level = 'info', progress, newStatus = null) {
    const now = admin.firestore.FieldValue.serverTimestamp();
    const executionRef = db.collection('executions').doc(sessionId);
    
    const updatePayload = {
        logEntries: admin.firestore.FieldValue.arrayUnion({ timestamp: now, message, level }),
        progress: progress,
    };

    if (newStatus) {
        updatePayload.status = newStatus;
    }

    await executionRef.update(updatePayload);
}

async function finalizeExecution(sessionId) {
    const now = admin.firestore.FieldValue.serverTimestamp();
    const executionRef = db.collection('executions').doc(sessionId);
    const sessionRef = db.collection('sessions').doc(sessionId);
    const resultsRef = db.collection('results').doc(sessionId);

    const executionDoc = await executionRef.get();
    const method = executionDoc.data().method;

    // Finalize execution
    await executionRef.update({
        status: 'completed',
        progress: 100,
        finishedAt: now,
        logEntries: admin.firestore.FieldValue.arrayUnion({ timestamp: now, message: 'Execution complete.', level: 'info' })
    });

    // Create mock results
    const resultData = {
        id: sessionId,
        summary: `Analysis with ${method.name} finished successfully. The outcome suggests a strong potential solution. `,
        interpretation: 'The model converged, indicating a stable and likely optimal result within the defined constraints.',
        nextActions: ['Review raw data', 'Compare with alternative', 'Start new session'],
        metrics: { 'final_cost': 42.17, 'iterations': 1250 },
        rawOutput: { 'solution_vector': [0.1, 0.9, 0.2, 0.8] },
        method: method,
    };
    await resultsRef.set(resultData);

    // Update session status
    await sessionRef.update({ status: 'completed', currentStage: 'results', updatedAt: now });
}