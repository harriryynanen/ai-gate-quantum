import React from 'react';

const Message = ({ message }) => {
  const { text, sender } = message;
  const isUser = sender === 'user';

  const messageStyle = {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    maxWidth: '80%',
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    backgroundColor: isUser ? '#dcf8c6' : '#fff',
    border: '1px solid #ddd',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>{text}</div>
    </div>
  );
};

export default Message;
