import React from 'react';

const Header = () => {
  // Mock data for placeholders
  const sessionTitle = 'Q3 Financial Risk Analysis';
  const currentStage = 'Data Preparation';

  return (
    <header style={styles.header}>
      <div style={styles.logoArea}>
        <span style={{fontWeight: 'bold'}}>QuantumFlow</span>
      </div>
      <div style={styles.sessionArea}>
        <span>{sessionTitle} / {currentStage}</span>
      </div>
      <div style={styles.controlsArea}>
        <a href="#" style={styles.controlLink}>Help</a>
        <a href="#" style={styles.controlLink}>Settings</a>
        <a href="#" style={styles.controlLink}>Sign In</a>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1.5rem',
    height: '50px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    width: '100%',
    boxSizing: 'border-box',
  },
  logoArea: {
    flex: 1,
  },
  sessionArea: {
    flex: 2,
    textAlign: 'center',
    color: '#4a5568',
  },
  controlsArea: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1.5rem',
  },
  controlLink: {
    color: '#4a5568',
    textDecoration: 'none',
  },
};

export default Header;
