import React from "react";
import "./css/LoginPage.css";
import { Input } from "antd";

const LoginPage = () => {
  return (
    <div className="MembershipForm">
      <div className="backgroudImg"></div>
      <div className="contain-container">
        <div className="container">
          <h1>UME影城会员注册</h1>

          <form method="get">
            <div className="fieldset">
              <p>登录</p>
              <Input placeholder="Outlined" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
