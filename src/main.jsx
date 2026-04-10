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
  if (typeof resource === 'string' && resource.startsWith('/api')) {
    resource = __API_URL__ + resource;
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
