import React from 'react';
import SearchSection from '../components/SearchSection';
import Properties from '../components/Properties';

function Imoveis() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da página */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossos Imóveis</h1>
          <p className="text-xl opacity-90">Encontre o imóvel perfeito para você</p>
        </div>
      </div>

      {/* Seção de busca avançada */}
      <SearchSection />

      {/* Lista completa de propriedades */}
      <Properties showFiltersBelow={true} showAll={true} />
    </div>
  );
}

export default Imoveis;
