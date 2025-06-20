import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import WhatsAppButton from './components/WhatsAppButton';

// Páginas
import Home from './pages/Home';
import Imoveis from './pages/Imoveis';
import Galeria from './pages/Galeria';
import Contato from './pages/Contato';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
