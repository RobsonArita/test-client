// App.js
import React from 'react';
import GlobalStyles from './global/GlobalStyles';
import ApplicationRoutes from './routes';
import Header from './components/layout/header/header';
import Headerv2 from './components/layout/header/headerv2';
import { ConfigProvider, theme } from 'antd';
import AppLayout from './components/layout/AppLayout';
import { ThemeProvider } from 'styled-components'
import AppTheme from './theme'

function App() {
  return (
    <div>
        <AppLayout/>
    </div>
  );
}

export default App;
