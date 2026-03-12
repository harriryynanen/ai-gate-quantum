import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext';

const SessionHeader = () => {
  const { session } = useContext(SessionContext);

  if (!session) {
    return <p>No active session.</p>;
  }

  return (
    <div className="session-header">
      <h2>Session: {session.id}</h2>
      <p>Status: {session.status}</p>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
};

export default SessionHeader;
