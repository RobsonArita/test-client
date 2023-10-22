import './headerv2.css'
import { Layout } from 'antd'
import SignupModalv2 from '../../signup/SignupModalv2'
import { SelectorState } from '../../../redux/reducers/authReducer'
import LoginModalv2 from '../../login/LoginModalv2'
import { useSelector } from 'react-redux'
import LogoutModalv2 from '../../logout/LogoutModalv2'
import { IUser } from '../../../interfaces/user'
import { translateUserLevel } from '../../../functions/translate'

const { Header,  } = Layout

function Headerv2 ({ reloadHeader }: { 
  reloadHeader: () => void
}) {
  const onLoginSuccess = () => {
    reloadHeader()
  }

  const isAuthenticated: boolean = useSelector((state: SelectorState) => Boolean(state?.auth?.token))
  const userLevel: IUser['level'] | string = useSelector((state: SelectorState) => 
  state?.auth?.user?.level ? translateUserLevel(state.auth.user.level) : '')
  const userName: IUser['name'] | string = useSelector((state: SelectorState) =>
  state?.auth?.user?.name ? state.auth.user.name : '')

  const authenticated = <>
    <div className='divright'>
      <LogoutModalv2 onLoginSuccess={onLoginSuccess} />
    </div></>
  
  const leftHeaderText = isAuthenticated ? `${userLevel} - ${userName}` : ''

  return (
    <Layout>
      <Header className='ant-header'>
      <div className='divspan'>
      <span>{leftHeaderText}</span>
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
