import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import homePage from "./Views/homePage";
import LoginPage from "./Views/LoginPage";
import infoSearch from "./Views/infoSearch";
import realtimeDetect from "./Views/realtimeDetect";
import familyContact from "./Views/familyContact";
import logoImage from "./assets/big__1_-removebg.png";
import ElderlyDetail from "./Views/ElderlyDetail";

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
      {!isLoginPage && (
        <Layout className="container">
          <Header className="header">
            <img src={logoImage} className="logoImage" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["home"]}
              items={items}
              className="MenuBar"
            />
          </Header>
          <Content className={isLoginPage ? "full-screen" : "content"}>
            <div className="content-inner">
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={homePage()} />
                <Route path="/query" element={infoSearch()} />
                <Route path="/monitor" element={realtimeDetect()} />
                <Route path="/contact" element={familyContact()} />
                <Route path="/elderly/:id" element={<ElderlyDetail />} />
              </Routes>
            </div>
          </Content>
          <Footer className="footer">
            Group of Barbie ©{new Date().getFullYear()} Created by FrontEnd Team
            of Barbie
          </Footer>
        </Layout>
      )}
    </Router>
  );
};
export default App;
