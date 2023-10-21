import React from 'react'
import './headerv2.css'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import SignupModalv2 from '../../signup/SignupModalv2'
import { AuthState } from '../../../redux/reducers/authReducer'
import LoginModalv2 from '../../login/LoginModalv2'

const { Header, Content, Sider } = Layout

function Headerv2 (stateValues: AuthState) {
  return(
    <Layout>
      <Header className='ant-header'>
        <div className='header-div'></div>
        <div className="header-right">
          <div className='button-container'>
          <SignupModalv2 />
          </div>
          <div className='button-container'>
          <LoginModalv2 />
          </div>
        </div>
      </Header>
    </Layout>
  )
}

export default Headerv2