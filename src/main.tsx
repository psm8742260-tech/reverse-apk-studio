import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Global error listener to prevent silent failures and white screens
const isIgnorableError = (message: string) => {
  if (!message) return false;
  const msg = message.toLowerCase();
  return msg.includes('websocket') || 
         msg.includes('vite') || 
         msg.includes('hmr') || 
         msg.includes('extension') ||
         msg.includes('failed to fetch') ||
         msg.includes('connection lost') ||
         msg.includes('transport error') ||
         msg.includes('database is closing') ||
         msg.includes('database is closed') ||
         msg.includes('database is hidden') ||
         msg.includes('closing/hidden') ||
         msg.includes('error 0:');
};

window.addEventListener('error', (event) => {
  if (isIgnorableError(event.message)) {
    return;
  }
  console.error('Global Error Captured:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  const message = (event.reason?.message || String(event.reason || '')).toLowerCase();
  if (isIgnorableError(message)) {
    return;
  }
  console.error('Unhandled Promise Rejection:', event.reason);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
