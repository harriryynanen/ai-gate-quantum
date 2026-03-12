
import React, { useState, useContext } from 'react';
import { SessionContext } from '../context/SessionContext';

function Chat() {
  const [goal, setGoal] = useState('I need to find the best way to allocate marketing budget across several channels.');
  const { startNewSession, loading: sessionLoading } = useContext(SessionContext);
  const [error, setError] = useState(null);

  const handleStartSession = async () => {
    if (!goal.trim() || sessionLoading) return;

    setError(null);

    try {
      await startNewSession(goal);
      // The context handles navigation, so no need to navigate here.
    } catch (err) {
      console.error("Failed to create session: ", err);
      setError('Failed to start a new session. Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="text-center pt-8 pb-4">
        <h1 className="text-3xl font-bold">AI Chat Workspace</h1>
        <p className="text-lg text-gray-600">Let's define a goal for your new analysis.</p>
      </div>
      
      {/* Chat history section - mock */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white rounded-t-lg shadow-inner">
          <div className="p-4 bg-gray-100 rounded-lg max-w-xl">
              <p className="font-semibold">AI Assistant</p>
              <p>Welcome! What problem are you trying to solve today? For example, you could say 'I want to analyze financial risk' or 'Optimize my supply chain'.</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg max-w-xl self-end ml-auto">
              <p className="font-semibold">You</p>
              <p>{goal}</p>
          </div>
           <div className="p-4 bg-gray-100 rounded-lg max-w-xl">
              <p className="font-semibold">AI Assistant</p>
              <p>Excellent! That's a classic optimization problem. To get started, I'll need you to prepare some data about your channels and budget constraints.</p>
          </div>
      </div>

      {/* Input section */}
      <div className="p-4 bg-white border-t">
        <div className="flex rounded-md shadow-sm">
            <input 
              type="text" 
              className="flex-1 p-3 border-gray-300 rounded-l-md" 
              placeholder="Your goal description..." 
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStartSession()}
              disabled={sessionLoading}
            />
            <button 
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-md disabled:bg-gray-400"
              onClick={handleStartSession}
              disabled={sessionLoading || !goal.trim()}
            >
              {sessionLoading ? 'Starting...' : 'Send'}
            </button>
        </div>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        <div className="text-center mt-4">
            <button 
              onClick={handleStartSession} 
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-400"
              disabled={sessionLoading || !goal.trim()}
            >
                Goal is set, let's prepare the data
            </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
