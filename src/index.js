import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss'; // Changed from './index.css' to './index.scss'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PrimeReactProvider } from 'primereact/api';
// PrimeReact Theme & Core CSS
import 'primereact/resources/themes/lara-light-blue/theme.css';  // You can change theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </PrimeReactProvider>
  </React.StrictMode>
);