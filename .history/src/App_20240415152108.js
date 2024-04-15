import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import "./App.scss";
import LoginPage from "./Views/LoginPage";
import HomePage from "./Views/homePage";
import InfoSearch from "./Views/infoSearch";
import RealtimeDetect from "./Views/realtimeDetect";
import FamilyContact from "./Views/familyContact";
import ElderlyDetail from "./Views/ElderlyDetail";
import logoImage from "./assets/big__1_-removebg.png";

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "home",
    label: <Link to="/home">首页</Link>,
  },
  {
    key: "query",
    label: <Link to="/query">信息查询</Link>,
  },
  {
    key: "monitor",
    label: <Link to="/monitor">实时监测</Link>,
  },
  {
    key: "contact",
    label: <Link to="/contact">联系家属</Link>,
  },
];

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Set LoginPage as the default entry point */}
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />

        {/* DefaultContainer wraps other pages with Header and Footer */}
        <Route element={<DefaultContainer />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/query" element={<InfoSearch />} />
          <Route path="/monitor" element={<RealtimeDetect />} />
          <Route path="/contact" element={<FamilyContact />} />
          <Route path="/elderly/:id" element={<ElderlyDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

const DefaultContainer = () => {
  const navigate = useNavigate();

  // 创建一个事件处理函数，用于在图片被点击时导航到登录页面
  const handleLogoClick = () => {
    navigate("/login");
  };

  return (
    <Layout className="container">
      <Header className="header">
        <img
          src={logoImage}
          className="logoImage"
          onClick={handleLogoClick}
          alt="logo"
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={items}
          className="MenuBar"
        />
      </Header>
      <Content className="content">
        <div className="content-inner">
          <Outlet /> {/* This will render the nested routes */}
        </div>
      </Content>
      <Footer className="footer">
        Group of Barbie ©{new Date().getFullYear()} Created by FrontEnd Team of
        Barbie
      </Footer>
    </Layout>
  );
};

export default App;
