import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flexGrow: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px 0 0 5px' }}
        placeholder="Type your message..."
      />
      <button type="submit" style={{ padding: '10px 15px', border: '1px solid #ccc', borderLeft: 'none', backgroundColor: '#007bff', color: 'white', borderRadius: '0 5px 5px 0', cursor: 'pointer' }}>
        Send
      </button>
    </form>
  );
};

export default MessageInput;
