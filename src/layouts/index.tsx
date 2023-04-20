import { Link, Outlet,useAppData, useLocation } from 'umi';
import {Avatar, Breadcrumb, Layout, Menu, Space, theme} from 'antd';
import React from "react";
import {UserOutlined} from "@ant-design/icons-svg";

const { Header, Content, Footer } = Layout;

export default function BasicLayouts() {
    const { clientRoutes } = useAppData();
    const location = useLocation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

  return (


      <Layout className="layout"
              route={clientRoutes[0]}
              location={location}
              menuItemRender={(menuItemProps, defaultDom) => {
                  if (menuItemProps.isUrl || menuItemProps.children) {
                      return defaultDom;
                  }
                  if (menuItemProps.path && location.pathname !== menuItemProps.path) {
                      return (
                          <Link to={menuItemProps.path} target={menuItemProps.target}>
                              {defaultDom}
                          </Link>
                      );
                  }
                  return defaultDom;
              }}>

          <Header>
              <div className="logo" />
              <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  items={new Array(2).fill(null).map((_, index) => {
                      const key = index + 1;
                      return {
                          key,
                          label: `nav ${key}`,
                      };
                  })}
              />
          </Header>
          <Content style={{ padding: '0 50px' }}>
              <div className="site-layout-content" style={{ background: colorBgContainer }}>

              </div>
          </Content>
          <Outlet/>

          <Footer style={{textAlign: 'center'}}>CS28-2 ©2023 Created by G2 TEAM</Footer>

      </Layout>
  );
};

