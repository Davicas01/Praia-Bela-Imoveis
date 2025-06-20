import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import WhatsAppButton from './components/WhatsAppButton';

// Importar páginas
import Home from './pages/Home';
import Imoveis from './pages/Imoveis';
import Galeria from './pages/Galeria';
import Contato from './pages/Contato';

function SimpleApp() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/imoveis" element={<Imoveis />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/contato" element={<Contato />} />
            </Routes>
          </main>
          <WhatsAppButton />
        </div>
      </Router>
    </AppProvider>
  );
}

export default SimpleApp;
