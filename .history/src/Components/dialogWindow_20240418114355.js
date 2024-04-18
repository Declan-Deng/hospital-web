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
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(
      "ws://uq3dgyxloddp.hk1.xiaomiqiu123.top/chat/user/2"
    );

    socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newMessage = {
        id: messages.length + 1,
        user: "Assistant",
        avatar: "https://dummyimage.com/128x128/354ea1/ffffff&text=G",
        content: data.message,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.onerror = (event) => {
      console.error("WebSocket Error: ", event);
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    setWs(socket);

    // Clean up the WebSocket when the component unmounts
    return () => {
      socket.close();
    };
  }, []); // 空依赖数组意味着这个 effect 只在组件挂载时运行一次

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

      // Send the message to the server via WebSocket
      if (ws) {
        ws.send(JSON.stringify({ targetUserId: "2", message: inputValue }));
      }

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
