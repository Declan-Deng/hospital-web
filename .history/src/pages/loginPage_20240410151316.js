import React, { useState } from "react";
import "./css/LoginPage.css";
import { Input, Checkbox, Button } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import imageSrc from "../images/big__1_-removebg.png";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <>
      {/* <div className="backgroudImg"></div> */}

      <div className="container">
        <div className="nav">
          <img src={imageSrc} className="imgIcon" />
          <p>智慧养老院健康管理系统</p>
        </div>
        <div className="content">
          <div className="fieldset">
            <p className="loginText">登录</p>
            <Input
              placeholder="请输入用户名"
              size="large"
              variant="filled"
              prefix={<UserOutlined />}
              className="inputStyle"
            />
            <Input.Password
              placeholder="请输入密码(6-16位字母加数字)"
              prefix={<LockOutlined />}
              size="large"
              variant="filled"
              className="inputStyle"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <div style={{ marginBottom: 30 }}>
              <Checkbox onChange={onChange}>记住密码</Checkbox>
            </div>
            <Button type="primary" size="large" className="buttonBig">
              登录
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
