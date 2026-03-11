import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div style={{ height: '400px', overflowY: 'auto', padding: '10px', border: '1px solid #eee', marginBottom: '10px' }}>
      {messages.map(msg => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default MessageList;
