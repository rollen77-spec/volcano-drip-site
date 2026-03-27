import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { EcwidProvider } from '@/context/EcwidContext';
import BrevoTracker from '@/components/BrevoTracker';

ReactDOM.createRoot(document.getElementById('root')).render(
  <EcwidProvider>
    <BrevoTracker />
    <App />
  </EcwidProvider>
);