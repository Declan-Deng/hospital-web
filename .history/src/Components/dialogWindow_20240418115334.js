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
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(
      "ws://uq3dgyxloddp.hk1.xiaomiqiu123.top/chat/doctor/2"
    );

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          user: "User", // Assuming messages from the user come with a different user tag
          avatar: "https://dummyimage.com/128x128/000000/ffffff&text=U",
          content: message.message,
        },
      ]);
    };

    ws.onerror = (error) => {
      console.log("WebSocket Error: ", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

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
      socket.send(JSON.stringify({ targetUserId: "2", message: inputValue }));
      setInputValue("");
    }
  };

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
