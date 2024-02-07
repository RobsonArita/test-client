import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { PersistGate } from 'redux-persist/integration/react';
import customTheme from './theme';
import { persistor, store } from './redux/store/store';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <ConfigProvider theme={customTheme}>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </PersistGate>
  </ConfigProvider>,
  document.getElementById('root')
);

reportWebVitals();
