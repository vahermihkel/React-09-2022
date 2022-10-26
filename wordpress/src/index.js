import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './index.css';
import './i18n';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartSumContextProvider } from './store/CartSumContext';
import { AuthContextProvider } from './store/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartSumContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </CartSumContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// let muutuja = 2;
// muutuja = 5;
// color: red;
// color: #ff2800;

// vajadusel proovitöid

// Wordpressi projekt

// lõpuprojekt
// spetsiifilisi nõudeid ei ole - nõue on et on Reactis kirjutatud
// võiks seda esitleda viimasel päeval