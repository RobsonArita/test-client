import React, { useState } from 'react';
import './AppSider.css';
import { Layout, Menu } from 'antd';
import ApplicationRoutes from '../../../routes';
import { getUserPaths } from './items/defaultItems';
import { useSelector } from 'react-redux';
import { SelectorState } from '../../../redux/reducers/authReducer';
import { IUser } from '../../../interfaces/user';

const { Content, Footer, Sider } = Layout;

function AppSider() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPath, setSelectedPath] = useState('/');

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedPath(key);
  };

  const userLevel: IUser['level'] = useSelector((state: SelectorState) => state?.auth?.user?.level)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          defaultSelectedKeys={['/']}
          mode="inline"
          items={getUserPaths(userLevel)}
          theme="dark"
          onClick={({ key }) => handleMenuClick({ key })}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <ApplicationRoutes selectedPath={selectedPath} />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default AppSider;
