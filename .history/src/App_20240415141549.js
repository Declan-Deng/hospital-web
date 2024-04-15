import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import "./App.scss";
import homePage from "./Views/homePage";
import LoginPage from "./Views/LoginPage";
import infoSearch from "./Views/infoSearch";
import realtimeDetect from "./Views/realtimeDetect";
import familyContact from "./Views/familyContact";
import ElderlyDetail from "./Views/ElderlyDetail";
import logoImage from "./assets/big__1_-removebg.png";

const { Header, Content, Footer } = Layout;

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Router>
      <Layout className="container" style={{ minHeight: "100vh" }}>
        {!isLoginPage && (
          <Header className="header">
            <img src={logoImage} className="logoImage" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["home"]}
              items={[
                { key: "home", label: <Link to="/">首页</Link> },
                { key: "query", label: <Link to="/query">信息查询</Link> },
                { key: "monitor", label: <Link to="/monitor">实时监测</Link> },
                { key: "contact", label: <Link to="/contact">联系家属</Link> },
              ]}
              className="MenuBar"
            />
          </Header>
        )}
        <Content className="content">
          <div className="content-inner">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={homePage()} />
              <Route path="/query" element={infoSearch()} />
              <Route path="/monitor" element={realtimeDetect()} />
              <Route path="/contact" element={familyContact()} />
              <Route path="/elderly/:id" element={<ElderlyDetail />} />
            </Routes>
          </div>
        </Content>
        {!isLoginPage && (
          <Footer className="footer">
            Group of Barbie ©{new Date().getFullYear()} Created by FrontEnd Team
            of Barbie
          </Footer>
        )}
      </Layout>
    </Router>
  );
};

export default App;
