import './AppLayout.css'
import { Layout,  } from 'antd'
import Headerv2 from './header/headerv2'
import AppSider from './sider/AppSider'
import { connect } from 'react-redux';
import { AuthState } from '../../redux/reducers/authReducer'

function AppLayout (stateValues: AuthState) {
  return(
    <Layout>
          <Headerv2 { ...stateValues }/>
          <AppSider { ...stateValues }/>
    </Layout>
  )
}

const mapStateToProps = (state: AuthState) => ({
  token: state.token,
  user: state.user
})

export default connect(mapStateToProps)(AppLayout)