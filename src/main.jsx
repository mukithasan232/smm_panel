import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'

// Intercept all fetch requests starting with /api and prepend the backend URL
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  let [resource, config] = args;
  try {
    const apiUrl = typeof __API_URL__ !== 'undefined' ? __API_URL__ : '';
    if (typeof resource === 'string' && resource.startsWith('/api')) {
      const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
      resource = baseUrl + resource;
    }
  } catch (err) {
    console.error('Fetch intercept error:', err);
  }
  return originalFetch(resource, config);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
)
