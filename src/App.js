import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './App.scss'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import homePage from "./Views/homePage";
import infoSearch from "./Views/infoSearch";
import realtimeDetect from "./Views/realtimeDetect";
import familyContact from "./Views/familyContact";
import ElderlyDetail from './Views/ElderlyDetail';

const { Header, Content, Footer } = Layout;
const items = [
    {
        key: 'home',
        label: <Link to="/">首页</Link>,
    },
    {
        key: 'query',
        label: <Link to="/query">信息查询</Link>,
    },
    {
        key: 'monitor',
        label: <Link to="/monitor">实时监测</Link>,
    },
    {
        key: 'contact',
        label: <Link to="/contact">联系家属</Link>,
    },
];


const App = () => {
        return (
            <Router>
                  <Layout className="container">
                      <Header
                          className="header"
                      >
                          <div className="demo-logo" />
                          <Menu
                              theme="dark"
                              mode="horizontal"
                              defaultSelectedKeys={['home']}
                              items={items}
                              style={{
                                  flex: 1,
                                  minWidth: 0,
                              }}
                          />
                      </Header>
                      <Content className="content">
                          <div className="content-inner">
                              <Routes>
                                  <Route path="/" element={homePage()} />
                                  <Route path="/query" element={infoSearch()} />
                                  <Route path="/monitor" element={realtimeDetect()} />
                                  <Route path="/contact" element={familyContact()} />
                                  <Route path="/elderly/:id" element={<ElderlyDetail />} />
                              </Routes>
                          </div>
                      </Content>
                      <Footer
                          style={{
                              textAlign: 'center',
                          }}
                      >
                          Group of Barbie ©{new Date().getFullYear()} Created by FrontEnd Team of Barbie
                      </Footer>
                  </Layout>
        </Router>
        )

};
export default App;
