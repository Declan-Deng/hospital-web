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
      console.log("Received raw data:", event.data);
      try {
        if (
          event.data &&
          typeof event.data === "string" &&
          event.data.startsWith("{") &&
          event.data.endsWith("}")
        ) {
          const message = JSON.parse(event.data);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: prevMessages.length + 1,
              user: message.userName || "User",
              avatar:
                message.avatar ||
                "https://dummyimage.com/128x128/000000/ffffff&text=U",
              content: message.message,
            },
          ]);
        } else {
          // Handle non-JSON data
          console.log("Received non-JSON data:", event.data);
        }
      } catch (error) {
        console.error("Error parsing JSON: ", error);
        console.error("Received data: ", event.data);
      }
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
      // Send message in a format that matches expected format on user side
      if (socket) {
        socket.send(
          JSON.stringify({
            targetUserId: "2",
            message: inputValue,
          })
        );
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
