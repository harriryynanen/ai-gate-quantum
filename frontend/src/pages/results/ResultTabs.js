import React from 'react';
import './Results.css';

const ResultTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ['Summary', 'Solver Output', 'Transparency Report'];

  return (
    <div className="result-tabs">
      {tabs.map(tab => (
        <button
          key={tab}
          className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ResultTabs;
