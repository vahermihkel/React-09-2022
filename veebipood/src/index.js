import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// ilma loogeliste sulgudeta ta võtab terve selle node_module mooduli kasutusele
// {  } ta võtab tüki sellest moodulist

// npm i react-router-dom
// BrowserRouter võimaldab rakenduses navigeerida

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


