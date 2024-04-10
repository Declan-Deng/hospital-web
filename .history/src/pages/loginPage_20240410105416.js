import React, { useState } from "react";
import "./css/LoginPage.css";
import { Input, Checkbox, Button } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

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
              <div>
                <Checkbox onChange={onChange}>记住密码</Checkbox>
              </div>
              <Button type="primary" size="large">
                登录
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
