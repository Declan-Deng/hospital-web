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
              <legend>欢迎加入UME大家庭！</legend>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
