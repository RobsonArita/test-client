import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import { ConfigProvider } from 'antd'
import customTheme from './theme'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <ConfigProvider theme={customTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
)

reportWebVitals()