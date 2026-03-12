
import React from 'react';
// import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  // const auth = getAuth();
  // const [user, loading] = useAuthState(auth);

  // const signInWithGoogle = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider);
  // };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (user) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh' 
    }}>
      <h2>Login to Quantum Analytics Platform</h2>
      <p>Authentication is currently bypassed for development.</p>
      <p>You will be able to log in here once Firebase is configured.</p>
      {/* <button onClick={signInWithGoogle}>Sign in with Google</button> */}
    </div>
  );
};

export default LoginPage;
