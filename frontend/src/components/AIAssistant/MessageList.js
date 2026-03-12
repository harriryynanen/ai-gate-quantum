import React from 'react';

const Message = ({ message }) => (
  <div className={`my-2 p-3 rounded-lg max-w-xs ${message.sender === 'ai' ? 'bg-blue-100' : 'bg-gray-100 ml-auto'}`}>
    <p className="text-sm">{message.text}</p>
  </div>
);

const MessageList = ({ messages }) => (
  <div className="h-64 overflow-y-auto">
    {messages.map(msg => <Message key={msg.id} message={msg} />)}
  </div>
);

export default MessageList;
