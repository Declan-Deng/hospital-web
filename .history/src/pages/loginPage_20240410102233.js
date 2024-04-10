import React, { useState } from "react";
import "./css/LoginPage.css";
import { Input } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <>
      <div className="backgroudImg"></div>
      <div className="contain-container">
        <div className="container">
          <h1>UME影城会员注册</h1>

          <form method="get">
            <div className="fieldset">
              <p className="loginText">登录</p>
              <Input
                placeholder="Outlined"
                size="large"
                variant="filled"
                prefix={<UserOutlined />}
                style={{ marginBottom: "20px" }}
              />
              <Input.Password
                placeholder="input password"
                prefix={<LockOutlined />}
                size="large"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
