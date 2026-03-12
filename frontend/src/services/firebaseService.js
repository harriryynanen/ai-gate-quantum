
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have a firebase.js file that exports the db instance
import { mockSessions } from '../mocks/mockData';

const MOCK_MODE = process.env.REACT_APP_MOCK_MODE === 'true';

/**
 * Creates a new session in Firestore.
 * @param {string} goal - The goal of the session.
 * @returns {Promise<string>} The ID of the newly created session.
 */
export const createSession = async (goal) => {
  if (MOCK_MODE) {
    const newSession = {
      id: `mock-${Date.now()}`,
      goal,
      title: 'New Mock Session',
      status: 'new',
      currentStage: 'goal',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    mockSessions.push(newSession);
    return newSession.id;
  }

  const docRef = await addDoc(collection(db, 'sessions'), {
    goal,
    title: 'New Analysis Session',
    status: 'new',
    currentStage: 'goal',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    userId: null, // Placeholder for auth
  });
  return docRef.id;
};

/**
 * Retrieves all sessions from Firestore.
 * @returns {Promise<import('../types/firestore').Session[]>}
 */
export const getSessions = async () => {
  if (MOCK_MODE) {
    return mockSessions;
  }

  const querySnapshot = await getDocs(collection(db, 'sessions'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
