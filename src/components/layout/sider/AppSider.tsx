import React, { useState } from 'react';
import './AppSider.css';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import ApplicationRoutes from '../../../routes';
import { getUserPaths } from './items/defaultItems';
import { useSelector } from 'react-redux';
import { SelectorState } from '../../../redux/reducers/authReducer';
import { IUser } from '../../../interfaces/user';

const { Content, Footer, Sider } = Layout;

function AppSider() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const userLevel: IUser['level'] = useSelector((state: SelectorState) => state?.auth?.user?.level)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
        <div className="demo-logo-vertical" />
        <Menu
          selectedKeys={[location.pathname]}
          mode="inline"
          theme="dark"
        >
          {getUserPaths(userLevel).map((item: any) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <ApplicationRoutes />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default AppSider;
