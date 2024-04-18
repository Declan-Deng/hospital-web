import React, { useState, useEffect } from "react";
import "./dialogWindow.scss";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "John",
      avatar: "https://dummyimage.com/128x128/363536/ffffff&text=J",
      content: "你好老人家属(自动问候)",
    },
    {
      id: 2,
      user: "Assistant",
      avatar: "https://dummyimage.com/128x128/354ea1/ffffff&text=G",
      content: "你好(自动问候)",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        user: "John",
        avatar: "https://dummyimage.com/128x128/363536/ffffff&text=J",
        content: inputValue,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  useEffect(() => {
    // Set a timer to simulate receiving a message after 10 seconds
    const timer = setTimeout(() => {
      const autoMessage = {
        id: messages.length + 1,
        user: "Assistant",
        avatar: "https://dummyimage.com/128x128/354ea1/ffffff&text=G",
        content: "请求帮助",
      };
      setMessages((prevMessages) => [...prevMessages, autoMessage]);
    }, 10000); // 10,000 milliseconds = 10 seconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []); // Effect runs when the length of messages changes

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.user === "John" ? "user" : ""}`}
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
            placeholder="请输入内容"
            rows="1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          ></textarea>
          <button type="submit">发送</button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
