import React, { useState } from 'react';
import { Layout } from 'antd';
import Headerv2 from './header/headerv2';
import AppSider from './sider/AppSider';
import { connect } from 'react-redux';
import { AuthState } from '../../redux/reducers/authReducer';

function AppLayout() {
  const [reloadApp, setReloadApp] = useState(false);

  const reloadHeader = () => {
    setReloadApp(true);
  }

  const handleReload = () => {
    setReloadApp(false);
  }

  if (reloadApp) {
    console.log('entrei no reloadApp');
    handleReload();
  }

  return (
    <Layout>
      <Headerv2 reloadHeader={reloadHeader} />
      <AppSider />
    </Layout>
  );
}

// const mapStateToProps = (state: AuthState) => ({
//   token: state.auth.token,
//   user: state.auth.user
// });

const mapStateToProps = (state: AuthState) => {
  console.log({ mapState: state })
  return {
    // @ts-ignore
      token: state.auth.token,
    // @ts-ignore

      user: state.auth.user
  }
}

export default connect(mapStateToProps)(AppLayout);
