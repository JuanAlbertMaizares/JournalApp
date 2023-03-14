// modulos de terceros
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
// modulos propios
import { JournalApp } from "./JournalApp";
import './styles.css';
import { store } from './store';

// carga de la aplicacion
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* se provee el acceso al store y sus reducers */}
    <Provider store={store}>
        <BrowserRouter>
          <JournalApp />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
