import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './authContext.jsx'
import ThemeContext from './ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <ThemeContext>
    <AuthContext>
      <App />
      </AuthContext>
      </ThemeContext>
    </BrowserRouter>
  
)
