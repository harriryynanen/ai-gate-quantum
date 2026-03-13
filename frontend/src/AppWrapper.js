
import React from 'react';
import { initFirebase, isFirebaseInitialized } from './firebase';
import { SessionProvider } from './context/SessionContext';

// Initialize Firebase as the app loads
initFirebase();

const FirebaseNotConfigured = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-10 rounded-lg shadow-xl text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Firebase Not Configured</h1>
      <p className="text-gray-700">The Firebase environment configuration is missing or incomplete.</p>
      <p className="text-gray-700">Please check your <code>.env</code> file and ensure all Firebase variables are set correctly.</p>
      <p className="mt-4 text-sm text-gray-500">The app is running in a limited, offline mode.</p>
    </div>
  </div>
);

export const AppWrapper = ({ children }) => {
  const firebaseReady = isFirebaseInitialized();

  if (!firebaseReady) {
    return <FirebaseNotConfigured />;
  }

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};
