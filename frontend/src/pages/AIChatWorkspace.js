import React, { useState } from 'react';
import './AIChatWorkspace.css'; // New CSS for the chat layout

const AIChatWorkspace = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I am your AI assistant. How can I help you formulate your problem today?', sender: 'ai' },
    { id: 2, text: 'I want to find the optimal route for a delivery drone.', sender: 'user' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newUserMessage = { id: messages.length + 1, text: inputValue, sender: 'user' };
    // In a real app, you would get a response from the AI here
    setMessages([...messages, newUserMessage]);
    setInputValue('');
  };

  return (
    <div className="ai-chat-workspace">
      <header className="chat-header">
        <h1>AI Chat Workspace</h1>
      </header>

      <div className="message-list">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-avatar">{message.sender === 'ai' ? 'A' : 'U'}</div>
            <div className="message-content">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="message-input-area">
        <form onSubmit={handleSendMessage}>
          <input 
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default AIChatWorkspace;
