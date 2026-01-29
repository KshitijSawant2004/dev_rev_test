import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { StoreProvider } from './context/StoreContext.jsx'
import './index.css'
import { initDevRevPlug } from './lib/devrevPlug.js'

// Initialize DevRev Plug (session replay) once per page load.
// Note: plug.js loads asynchronously from index.html, so init waits for it.
initDevRevPlug()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
