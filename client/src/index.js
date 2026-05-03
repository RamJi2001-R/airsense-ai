import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AQIProvider } from './context/AQIContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AQIProvider>
      <App />
    </AQIProvider>
  </React.StrictMode>
)