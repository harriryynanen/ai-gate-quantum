import React from 'react';
import { Link } from 'react-router-dom';
// import { getAuth } from 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
  // const auth = getAuth();
  // const [user] = useAuthState(auth);

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem', 
      backgroundColor: '#f0f0f0' 
    }}>
      <h1>Quantum Analytics Platform</h1>
      <nav>
        <Link to="/">Dashboard</Link> |
        <Link to="/chat">AI Chat</Link> |
        <Link to="/history">Job History</Link>
      </nav>
      <div>
        {/* {user ? (
          <span>Welcome, {user.displayName || user.email}</span>
        ) : (
          <Link to="/login">Login</Link>
        )} */}
         <Link to="/login">Login</Link> {/* Simplified for development */}
      </div>
    </header>
  );
};

export default Header;
