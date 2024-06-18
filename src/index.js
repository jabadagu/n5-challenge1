import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { CartProvider } from './context/CartContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <App />        
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
  </React.StrictMode>
);
