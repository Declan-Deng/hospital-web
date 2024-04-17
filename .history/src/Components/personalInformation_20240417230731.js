import React from "react";
import { Avatar, Typography, Button } from "antd";
import "./WorkBench.scss";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import userAvatar from "../assets/iCopy_2024_04_17_20_34_48.png";

const { Text } = Typography;

const WorkBench = ({ staffName, level }) => {
  const user = {
    name: staffName,
    title: level,
    // lastLoginTime: "2023-04-16 14:30:00",
  };

  const handleSwitchAccount = () => {
    // 切换账号的逻辑
  };

  const handleLogout = () => {
    const navigate = useNavigate();
    // 退出登录的逻辑
    localStorage.removeItem("userId");
    navigate("/login", { replace: true });
    notification.success({
      message: "退出登录成功",
      duration: 2.5,
    });
  };

  return (
    <div className="workbench">
      <div className="workbench-left">
        <Avatar size={64} src={userAvatar} />
      </div>
      <div className="workbench-center">
        <Text style={{ fontWeight: 700 }}>欢迎回来,{user.name}!</Text>
        {/* <Text type="secondary">最近登录时间：{user.lastLoginTime}</Text> */}
        <Text type="secondary">职位：{user.title}</Text>
      </div>
      <div className="workbench-right">
        {/*<Button type="link" onClick={handleSwitchAccount}>*/}
        {/*    切换账号*/}
        {/*</Button>*/}
        <Button
          type="link"
          onClick={handleLogout}
          style={{ backgroundColor: "lightGray" }}
        >
          退出登录
        </Button>
      </div>
    </div>
  );
};

export default WorkBench;
