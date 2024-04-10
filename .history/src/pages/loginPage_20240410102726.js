import React, { useState } from "react";
import "./css/LoginPage.css";
import { Input, Checkbox } from "antd";
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
                placeholder="请输入用户名"
                size="large"
                variant="filled"
                prefix={<UserOutlined />}
                style={{ marginBottom: "20px" }}
              />
              <Input.Password
                placeholder="请输入密码(6-16位字母加数字)"
                prefix={<LockOutlined />}
                size="large"
                variant="filled"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <Checkbox onChange={onChange}>Checkbox</Checkbox>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
