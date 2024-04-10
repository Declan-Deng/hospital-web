import React from "react";
import "./css/LoginPage.css";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

const LoginPage = () => {
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
                prefix={<UserOutlined />}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
