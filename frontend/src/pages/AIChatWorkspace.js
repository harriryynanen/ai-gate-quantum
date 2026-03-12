import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MessageList from '../components/AISupport/MessageList';
import MessageInput from '../components/AISupport/MessageInput';
import Card from '../components/common/Card';

const AIChatWorkspace = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to the AI Guided Analysis Workspace. Describe the analysis you want to perform, and I will help you set it up.', sender: 'ai' },
  ]);
  const [showNextStep, setShowNextStep] = useState(false);
  const sessionId = `session-${Date.now()}`;

  const handleSendMessage = (text) => {
    const newMessage = { id: messages.length + 1, text, sender: 'user' };
    setMessages([...messages, newMessage]);

    // Mock AI response and reveal next step suggestion
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: `Okay, based on your request, the next logical step is to prepare your data. Let\'s get your dataset uploaded and configured.`,
        sender: 'ai'
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setShowNextStep(true);
    }, 1000);
  };

  return (
    <div>
      <div className="p-4 bg-gray-100 rounded-t-lg border-b mb-4">
        <h2 className="text-xl font-bold">AI Guided Analysis</h2>
        <p className="text-sm text-gray-600">Session ID: {sessionId}</p>
      </div>
      <Card>
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </Card>
      {showNextStep && (
        <Card className="mt-4 bg-blue-50 border-blue-200">
          <div className="flex items-center">
            <p className="font-semibold text-blue-800">Suggested Next Step:</p>
            <Link to="/data" className="ml-4 flex items-center font-bold text-blue-600 hover:text-blue-800">
              Proceed to Data Preparation
              <span className="ml-2 font-bold">&rarr;</span>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIChatWorkspace;
