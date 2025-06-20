import React from 'react';
import Contact from '../components/Contact';

function Contato() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da página */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-xl opacity-90">Estamos aqui para ajudar você a encontrar o imóvel ideal</p>
        </div>
      </div>

      {/* Componente de contato */}
      <Contact />
    </div>
  );
}

export default Contato;
