import React, { useEffect, useState } from "react";
import { Card, Button, Avatar, notification } from "antd";
import defaultAvatar from "../../assets/default-avatar.png";
import styles from "./ElderlyAlertCard.scss";

const ElderlyAlertCard = ({ data }) => {
  const {
    firstName,
    lastName,
    roomNumber,
    exceptionInfo,
    exceptionStartTime,
    isCurrent,
    avatar,
  } = data;

  // 添加状态变量
  const [alertRemoved, setAlertRemoved] = useState(false);
  const [message, setMessage] = useState("");
  let messageTimeout = null; // 用于保存定时器的引用

  useEffect(() => {
    // 组件卸载时清理定时器
    return () => {
      if (messageTimeout) {
        clearTimeout(messageTimeout);
      }
    };
  }, []);

  const fullName = `${firstName} ${lastName}`;
  const formattedTime = exceptionStartTime;
  const alertClass = () => (isCurrent ? "alertClass" : "");
  const alertCard = () => (isCurrent ? "alertCard" : "");
  const avatarUrl = avatar || defaultAvatar;

  function handleCancelAlert() {
    const id = localStorage.getItem("userId");
    if (!id) {
      console.error("No ID found in localStorage.");
      setMessage("无法找到ID。"); // 设置错误消息
      return;
    }

    const url = `http://uq3dgyxloddp.hk1.xiaomiqiu123.top/resident/cancel/${id}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Request successful:", data);
        setAlertRemoved(true);
        notification.success({
          message: "警报解除成功",
          duration: 2.5,
        });
        // 设置定时器以5秒后清除消息
        messageTimeout = setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        console.error("Request failed:", error);
        setMessage("请求失败。"); // 设置错误消息
      });
  }

  return (
    <Card
      title={`警报信息 - ${fullName}`}
      extra={
        <Button type="primary" onClick={handleCancelAlert}>
          解除警报
        </Button>
      }
      className={["elderly-alert-card", alertCard()]}
    >
      <div className="elderly-alert-card__details">
        <Avatar
          size={50}
          src={avatarUrl}
          className="elderly-alert-card__avatar"
        />
        <div>
          <p className="elderly-alert-card__name">
            <strong>姓名：</strong> {fullName}
          </p>
          <p className="elderly-alert-card__room">
            <strong>房间号：</strong> {roomNumber}
          </p>
        </div>
      </div>
      <strong>
        <strong>警报时间：</strong>
        {formattedTime}
      </strong>
      <p>
        <strong>警报信息：</strong>{" "}
        <span className={alertClass()}>
          {exceptionInfo}
          {isCurrent ? " - 请及时处理" : ""}
        </span>
      </p>
      {message && <p className="elderly-alert-card__message">{message}</p>}
    </Card>
  );
};

export default ElderlyAlertCard;
