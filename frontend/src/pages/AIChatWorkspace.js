import React, { useState } from 'react';
import MessageList from '../components/AISupport/MessageList';
import MessageInput from '../components/AISupport/MessageInput';
import Card from '../components/common/Card';

const AIChatWorkspace = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'ai' },
    { id: 2, text: 'I need to set up a new quantum simulation.', sender: 'user' },
    { id: 3, text: 'Great! What kind of simulation are you interested in?', sender: 'ai' },
  ]);

  const handleSendMessage = (text) => {
    const newMessage = { id: messages.length + 1, text, sender: 'user' };
    setMessages([...messages, newMessage]);
    // Mock AI response
    setTimeout(() => {
      const aiResponse = { id: messages.length + 2, text: `You said: "${text}". I am a mock AI.`, sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 500);
  };

  return (
    <div>
      <h2>AI Chat Workspace</h2>
      <Card>
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </Card>
    </div>
  );
};

export default AIChatWorkspace;
