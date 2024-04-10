import React from "react";
import "./LoginPage.css";

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
              {/* The form fields follow the same pattern */}
              <label className="form-label" htmlFor="name">
                <strong>您的姓名:</strong>
              </label>
              <input type="text" id="name" size="5" maxLength="20" />
              {/* Continue with the rest of the form fields */}
              <input type="submit" className="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
