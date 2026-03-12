import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';

function Chat() {
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
              <p>I need to find the best way to allocate marketing budget across several channels.</p>
          </div>
           <div className="p-4 bg-gray-100 rounded-lg max-w-xl">
              <p className="font-semibold">AI Assistant</p>
              <p>Excellent! That's a classic optimization problem. To get started, I'll need you to prepare some data about your channels and budget constraints.</p>
          </div>
      </div>

      {/* Input section */}
      <div className="p-4 bg-white border-t">
        <div className="flex rounded-md shadow-sm">
            <input type="text" className="flex-1 p-3 border-gray-300 rounded-l-md" placeholder="Your goal description..." />
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-md">Send</button>
        </div>
        <div className="text-center mt-4">
            <Link to="/data-prep" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
                Goal is set, let's prepare the data
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Chat;
