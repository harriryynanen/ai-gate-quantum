
import React, { useState, useRef, useEffect } from 'react';
import './AIAssistant.css';

const AIAssistant = () => {
    // Aloitustila sisältää vain tervetuloviestin
    const [messages, setMessages] = useState([
        {
            sender: 'ai',
            text: "Hello! I'm your AI assistant, ready to help with your analysis. What can I do for you today?"
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '' || isLoading) return;

        const userMessage = {
            sender: 'user',
            text: inputValue,
        };

        // Lisää käyttäjän viesti ja aseta lataustila
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setIsLoading(true);
        setInputValue('');

        try {
            // Muodostetaan historia lähetettäväksi backendille
            // Huom: Tämä on yksinkertainen esimerkki. Oikeassa sovelluksessa
            // historiaa pitäisi hallita monimutkaisemmin Geminin vaatimusten mukaisesti.
            const historyPayload = messages.map(msg => ({
                role: msg.sender === 'ai' ? 'model' : 'user',
                parts: [{ text: msg.text }]
            }));
            historyPayload.push({ role: 'user', parts: [{ text: userMessage.text }] });

            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ history: historyPayload }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const aiMessage = {
                sender: 'ai',
                text: data.response || "Sorry, I couldn't get a response.",
            };
            
            setMessages(prevMessages => [...prevMessages, aiMessage]);

        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage = {
                sender: 'ai',
                text: "My apologies, but I'm having trouble connecting to my brain right now. Please try again in a moment.",
            };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ai-assistant-container">
            <div className="ai-assistant-header">
                <div className="ai-title">AI Assistant</div>
                <div className="ai-status">Online</div>
            </div>
            <div className="ai-assistant-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <div className="message-bubble">{msg.text}</div>
                    </div>
                ))}
                {isLoading && (
                    <div className="message ai">
                        <div className="message-bubble typing-indicator">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="ai-assistant-input-area">
                <form onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask a question or give a command..."
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading}>Send</button>
                </form>
            </div>
        </div>
    );
};

export default AIAssistant;
