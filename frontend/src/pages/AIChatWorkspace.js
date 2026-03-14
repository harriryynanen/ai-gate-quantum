
import React, { useState } from 'react';
import './AIChatWorkspace.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const AIChatWorkspace = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: `Hello! Please describe the problem you want to solve. For example, try: "I need to price a European option." or "I need to solve a vehicle routing problem."`, sender: 'ai' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simple keyword-to-profile mapping for this POC
  const createProblemProfile = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('option') && lowerText.includes('pricing')) {
      return {
        problem_type: 'finance.option_pricing',
        user_goal: 'get_baseline',
        available_inputs: ['spot_price', 'strike_price', 'risk_free_rate', 'volatility', 'time_to_maturity'],
      };
    }
    // Add more mappings here for other problems
    return null;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '' || loading) return;

    const newUserMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setLoading(true);
    setError(null);
    setRecommendation(null);

    const profile = createProblemProfile(inputValue);

    if (!profile) {
      const aiErrorResponse = { id: Date.now() + 1, text: "I'm sorry, I couldn't determine a structured problem profile from your request. Please be more specific (e.g., 'price an option').", sender: 'ai' };
      setMessages(prev => [...prev, aiErrorResponse]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/recommend_solvers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }

      const recData = await response.json();
      setRecommendation(recData);
      const aiSummaryResponse = { 
        id: Date.now() + 1, 
        text: `Based on your request, I've identified a potential solution path. Here is my recommendation.`, 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiSummaryResponse]);

    } catch (err) {
      setError(err.message);
      const aiErrorResponse = { id: Date.now() + 1, text: `There was an error getting a recommendation: ${err.message}`, sender: 'ai' };
      setMessages(prev => [...prev, aiErrorResponse]);
    } finally {
      setLoading(false);
    }
  };
  
  const renderRecommendation = () => {
    if (!recommendation) return null;

    return (
      <div className="recommendation-card">
        <h3>Recommendation Details</h3>
        <p><strong>Recommended Path:</strong> <span className={`path-${recommendation.recommended_path}`}>{recommendation.recommended_path}</span></p>
        <p><strong>Rationale:</strong> {recommendation.rationale}</p>
        <div>
          <strong>Candidate Solvers:</strong>
          <ul>
            {recommendation.candidate_solvers.map(id => <li key={id}>{id}</li>)}
          </ul>
        </div>
        {recommendation.missing_inputs && Object.keys(recommendation.missing_inputs).length > 0 && (
          <div>
            <strong>Note on Other Solvers:</strong>
            <p>Other solvers were considered but not recommended because they are missing the following inputs:</p>
            <ul>
              {Object.entries(recommendation.missing_inputs).map(([id, inputs]) => (
                <li key={id}><strong>{id}:</strong> needs {inputs.join(', ')}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="ai-chat-workspace">
      <header className="chat-header">
        <h1>AI-Assisted Problem Definition</h1>
        <p>Step 1: Define your goal</p>
      </header>

      <div className="message-list">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-avatar">{message.sender === 'ai' ? 'A' : 'U'}</div>
            <div className="message-content">
              <p>{message.text}</p>
              {/* Render recommendation right after the AI summary message */}
              {message.id === messages[messages.length - 1].id && message.sender === 'ai' && recommendation && renderRecommendation()}
            </div>
          </div>
        ))}
        {loading && <div className="message ai"><div className="message-avatar">A</div><div className="message-content"><p>Analyzing and searching solver registry...</p></div></div>}
        {error && <div className="message ai error"><div className="message-avatar">A</div><div className="message-content"><p>Error: {error}</p></div></div>}
      </div>

      <div className="message-input-area">
        <form onSubmit={handleSendMessage}>
          <input 
            type="text"
            placeholder="Describe your problem here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>Send & Analyze</button>
        </form>
      </div>
    </div>
  );
};

export default AIChatWorkspace;
