import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css'
import './styles/Responsive.css'
import { AuthProvider } from './contexts/Auth.jsx';
import { PesquisaProvider } from './contexts/PesquisasContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PesquisaProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PesquisaProvider>
  </React.StrictMode>
)
