import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { PersistGate } from 'redux-persist/integration/react';
import customTheme from './theme'
import { persistor, store } from './redux/store/store'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <ConfigProvider theme={customTheme}>
    <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
    </PersistGate>
  </ConfigProvider>
)

reportWebVitals()