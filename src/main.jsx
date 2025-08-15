import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios';
import { API_BASE } from './config.js';
axios.defaults.baseURL = API_BASE;

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
