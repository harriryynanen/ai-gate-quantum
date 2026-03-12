
import React, { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon, AcademicCapIcon } from '@heroicons/react/24/solid';

// Mock AI responses based on keywords
const getMockResponse = (input) => {
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes('objective value')) {
    return "The objective value represents the final score of the optimization. A lower value is generally better in minimization problems.";
  } else if (lowerInput.includes('confidence')) {
    return "The confidence score is an estimate of how certain the AI is about the quality and relevance of this result. It is not a guarantee of correctness.";
  } else if (lowerInput.includes('next steps')) {
    return "Consider analyzing the sensitivity of the solution to input parameters, or re-running the job with a different solver to compare results.";
  } else if (lowerInput.includes('explain')) {
    return "This result was achieved by running the selected solver on the provided data. The summary gives a high-level overview of the outcome.";
  } else {
    return "I am an early-stage AI assistant. I can answer basic questions about the results, such as explaining the objective value, confidence, or next steps.";
  }
};

const ChatSidePanel = ({ execution }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    // Initial greeting from the AI
    useEffect(() => {
        if (execution) {
            setMessages([
                {
                    sender: 'ai',
                    text: `Hello! I\'m here to help you understand the results for execution ${execution.id.substring(0, 6)}... How can I assist?`
                }
            ]);
        }
    }, [execution]);

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');

        // Simulate AI thinking and responding
        setTimeout(() => {
            const aiResponse = getMockResponse(input);
            setMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
        }, 500);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg h-[40rem] flex flex-col">
            <div className="p-4 border-b flex items-center">
                <AcademicCapIcon className="h-8 w-8 text-indigo-600 mr-3" />
                <h2 className="text-xl font-bold">Contextual AI Assistant</h2>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div ref={messagesEndRef} />
                {messages.map((msg, index) => (
                    <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about these results..."
                        className="w-full pr-12 pl-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100"
                    />
                    <button 
                        onClick={handleSend}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                    >
                        <PaperAirplaneIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatSidePanel;
