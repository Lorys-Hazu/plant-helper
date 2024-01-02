import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider, ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  "token": {
    "colorPrimary": "#557c55",
    "colorInfo": "#557c55",
    "colorSuccess": "#a6cf98",
    "colorError": "#fa7070"
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
