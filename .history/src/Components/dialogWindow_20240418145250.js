import React, { useState, useEffect } from "react";
import "./dialogWindow.scss";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
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

      let messageData;
      try {
        // 尝试解析JSON，看是否为JSON数据
        messageData = JSON.parse(event.data);
      } catch (error) {
        // 如果解析失败，说明不是JSON，手动创建消息对象
        console.error("Error parsing JSON: ", error);
        messageData = {
          userName: "Unknown", // 或者其他默认用户名
          avatar: "https://dummyimage.com/128x128/000000/ffffff&text=U", // 默认头像
          message: event.data, // 直接使用接收到的文本作为消息内容
        };
      }

      // 更新消息列表
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1, // 生成新的ID
          user: messageData.userName || "User",
          avatar:
            messageData.avatar ||
            "https://dummyimage.com/128x128/000000/ffffff&text=U",
          content: messageData.message,
        },
      ]);

      console.log("Processed message:", messageData);
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
