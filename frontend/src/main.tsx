import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider, ThemeConfig } from 'antd'
import { ModalProvider } from './hooks/useModals'
import AuthProvider from './hooks/useAuth.tsx'

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
      <AuthProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
