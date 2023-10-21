import { useState } from 'react';
import './AppSider.css';
import { Layout, Menu } from 'antd';
import ApplicationRoutes from '../../../routes';
import { getUserPaths } from './items/defaultItems';
import { AuthState } from '../../../redux/reducers/authReducer';

const { Content, Footer, Sider } = Layout;

function AppSider (stateValues: AuthState) {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedPath, setSelectedPath] = useState('/')

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const handleOutCollapse = () => {
    setCollapsed(true)
  }

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedPath(key)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
     <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} onClick={handleCollapse}>
        <div className="demo-logo-vertical" />
        <Menu 
          defaultSelectedKeys={['/']}
          mode="inline"
          items={getUserPaths()}
          theme='dark'
          onClick={({ key }) => handleMenuClick({ key })}
        />
      </Sider>
      <Layout onClick={handleOutCollapse}>
        <Content style={{ margin: '0 16px' }}>
          
        <ApplicationRoutes selectedPath={selectedPath} />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default AppSider