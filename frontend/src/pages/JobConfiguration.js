
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobConfiguration.css';

const JobConfiguration = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isGoalDefined, setIsGoalDefined] = useState(false);
    const totalSteps = 4; // 1. Goal, 2. Data, 3. Solver, 4. Execute
    const stepLabels = ['Goal', 'Data', 'Solver', 'Execute'];

    // --- Chat State & Logic (integroitu suoraan) ---
    const [messages, setMessages] = useState([
        { sender: 'ai', text: "To begin, please describe the primary goal of your analysis. What questions are you trying to answer, or what problem are you aiming to solve?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '' || isLoading) return;

        const userMessage = { sender: 'user', text: inputValue };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setIsLoading(true);
        setInputValue('');

        try {
            const historyPayload = newMessages.map(msg => ({
                role: msg.sender === 'ai' ? 'model' : 'user',
                parts: [{ text: msg.text }]
            }));

            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: historyPayload }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            const aiMessage = { sender: 'ai', text: data.response || "Could not get a response." };
            setMessages(prev => [...prev, aiMessage]);
            if (!isGoalDefined) setIsGoalDefined(true);

        } catch (error) {
            console.error("Chat API error:", error);
            const errorMessage = { sender: 'ai', text: "Apologies, I'm having trouble connecting. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    // --- End Chat Logic ---

    const handleNextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const renderStepContent = () => {
        switch(currentStep) {
            case 1:
                return (
                    <div className="wizard-step active">
                        <div className="ws-title">Describe Your Analysis Goal</div>
                        <div className="ws-desc">Use the chat below to define the objective for the AI. The better you describe the goal, the better the AI can assist in selecting and configuring the right solver.</div>
                        <div className="chat-area">
                             {messages.map((msg, index) => (
                                <div key={index} className={`chat-msg ${msg.sender}`}>
                                    <div className={`chat-bubble ${msg.sender}`}>{msg.text}</div>
                                </div>
                            ))}
                             {isLoading && (
                                <div className="chat-msg ai">
                                    <div className="chat-bubble ai typing-indicator"><span></span><span></span><span></span></div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <form onSubmit={handleSendMessage} className="chat-input-row">
                            <input 
                                type="text" 
                                placeholder="e.g., 'I want to price a European call option...'" 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isLoading}
                            />
                            <button type="submit" className="send-btn" disabled={isLoading}>Send</button>
                        </form>
                    </div>
                );
            // Placeholder for future steps
            case 2: return <div className="wizard-step active"><div className="ws-title">Step 2: Data (Placeholder)</div></div>;
            case 3: return <div className="wizard-step active"><div className="ws-title">Step 3: Solver (Placeholder)</div></div>;
            case 4: return <div className="wizard-step active"><div className="ws-title">Step 4: Execute (Placeholder)</div></div>;
            default: return <div>Unknown Step</div>;
        }
    }

    return (
        <div className="job-config-container wizard-wrap">
            <div className="wizard-main">
                 <div className="config-header">
                    <h1>Configure New Analysis</h1>
                    <p>Follow the steps to set up and run your computation.</p>
                </div>
                <div className="step-bar">
                    <div className="step-bar-inner">
                        {stepLabels.map((label, index) => {
                            const stepNumber = index + 1;
                            let stepClass = 'step-item';
                            if (stepNumber < currentStep) stepClass += ' done';
                            if (stepNumber === currentStep) stepClass += ' active';
                            
                            return (
                                <div key={label} className={stepClass}>
                                    <div className="step-circle">
                                        {stepNumber < currentStep ? '✓' : stepNumber}
                                    </div>
                                    <div className="step-label">{label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="wizard-body">
                    {renderStepContent()}
                </div>

                <div className="wizard-footer">
                     <button 
                        className="btn-primary" 
                        onClick={handleNextStep}
                        disabled={currentStep === 1 && !isGoalDefined}
                     >
                        {currentStep === totalSteps ? 'Finish & Run' : 'Next Step'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobConfiguration;
