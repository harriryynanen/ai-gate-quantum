import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Card from '../common/Card';

const AIAssistantPanel = () => {
  // Mock data for now
  const session = {
    id: 'session-xyz-789',
    goal: 'Q3 Financial Risk Analysis',
  };

  const messages = [
    { id: 1, text: 'Welcome! Describe your analysis goal, and I will guide you.', sender: 'ai' },
    { id: 2, text: 'I need to analyze the risk profile of our Q3 transactions.', sender: 'user' },
    { id: 3, text: "Understood. Based on your goal, I recommend the 'Quantum Risk Solver'. Let's start by preparing your data.", sender: 'ai' },
  ];

  const handleSendMessage = (text) => {
    console.log('New message:', text);
    // This will be wired up to the session context
  };

  return (
    <div className="bg-gray-50 h-full flex flex-col border-l border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-lg">AI Assistant</h2>
        <p className="text-sm text-gray-600">Session: {session.goal}</p>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        <Card>
          <MessageList messages={messages} />
        </Card>
      </div>

      <div className="p-4 border-t border-gray-200">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default AIAssistantPanel;
