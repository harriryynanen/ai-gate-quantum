
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.js';
import { AppWrapper } from './AppWrapper.js';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <Router>
      <AppWrapper>
        <App />
      </AppWrapper>
    </Router>
  </React.StrictMode>
);
