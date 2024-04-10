import React, { useState } from 'react';
import './dialogWindow.scss';

const ChatPage = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            user: 'John',
            avatar: 'https://dummyimage.com/128x128/363536/ffffff&text=J',
            content: 'Explain quantum computing in simple terms',
        },
        {
            id: 2,
            user: 'Assistant',
            avatar: 'https://dummyimage.com/128x128/354ea1/ffffff&text=G',
            content:
                'Certainly! Quantum computing is a new type of computing that relies on the principles of quantum physics. Traditional computers, like the one you might be using right now, use bits to store and process information. These bits can represent either a 0 or a 1. In contrast, quantum computers use quantum bits, or qubits.\n\nUnlike bits, qubits can represent not only a 0 or a 1 but also a superposition of both states simultaneously. This means that a qubit can be in multiple states at once, which allows quantum computers to perform certain calculations much faster and more efficiently',
        },
    ]);

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            const newMessage = {
                id: messages.length + 1,
                user: 'John',
                avatar: 'https://dummyimage.com/128x128/363536/ffffff&text=J',
                content: inputValue,
            };
            setMessages([...messages, newMessage]);
            setInputValue('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.user === 'John' ? 'user' : ''}`}
                    >
                        <img src={message.avatar} alt={message.user} />
                        <div className="message-content">
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <form onSubmit={handleSubmit}>
          <textarea
              id="chat-input"
              placeholder="Enter your prompt"
              rows="1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
          ></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
