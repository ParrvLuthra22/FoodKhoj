import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "leaflet/dist/leaflet.css";
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
  </StrictMode>
);