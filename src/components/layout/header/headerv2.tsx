import React, { useState } from 'react'
import './headerv2.css'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import SignupModalv2 from '../../signup/SignupModalv2'
import { AuthState, SelectorState } from '../../../redux/reducers/authReducer'
import LoginModalv2 from '../../login/LoginModalv2'
import { useSelector } from 'react-redux'
import LogoutModalv2 from '../../logout/LogoutModalv2'
import { IUser } from '../../../interfaces/user'
import { translateUserLevel } from '../../../functions/translate'

const { Header, Content, Sider } = Layout

function Headerv2 ({ reloadHeader }: { 
  reloadHeader: () => void
}) {
  const onLoginSuccess = () => {
    reloadHeader()
  }

  const isAuthenticated: boolean = useSelector((state: SelectorState) => Boolean(state?.auth?.token))
  const userLevel: IUser['level'] | string = useSelector((state: SelectorState) => 
  state?.auth?.user?.level ? translateUserLevel(state.auth.user.level) : '')

  const authenticated = <>
    <div className='divright'>
      <LogoutModalv2 onLoginSuccess={onLoginSuccess} />
    </div></>
  return (
    <Layout>
      <Header className='ant-header'>
      <div className='divspan'>
      <span>{userLevel}</span>
      </div>
        <div className='header-div'></div>
        <div className="header-right">
          {isAuthenticated ? authenticated :
          (
            <>
              <div className='button-container'>
                <SignupModalv2 />
              </div>
              <div className='button-container'>
                <LoginModalv2 onLoginSuccess={onLoginSuccess} />
              </div>
            </>
          )}
        </div>
      </Header>
    </Layout>
  )
}

export default Headerv2
