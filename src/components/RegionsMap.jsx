import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt, FaHome, FaDollarSign } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import { useIntersectionObserver } from '../hooks';

function RegionsMap() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });
  const { setFilters } = useAppContext();
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    {
      id: 'praia-bela',
      name: 'Praia Bela',
      properties: 45,
      averagePrice: 'R$ 850k',
      features: ['Vista para o mar', 'Próximo ao centro', 'Área nobre'],
      color: '#1e40af',
      coordinates: '150,100 250,80 280,150 200,180 120,160',
      center: { x: 200, y: 130 }
    },
    {
      id: 'centro',
      name: 'Centro',
      properties: 32,
      averagePrice: 'R$ 650k',
      features: ['Comércio próximo', 'Transporte público', 'Vida urbana'],
      color: '#059669',
      coordinates: '280,150 380,130 400,200 320,220 280,180',
      center: { x: 340, y: 175 }
    },
    {
      id: 'beira-mar',
      name: 'Beira Mar',
      properties: 28,
      averagePrice: 'R$ 1.2M',
      features: ['Frente para o mar', 'Luxo e exclusividade', 'Área premium'],
      color: '#dc2626',
      coordinates: '120,160 200,180 220,250 140,270 100,220',
      center: { x: 160, y: 215 }
    },
    {
      id: 'jardins',
      name: 'Jardins',
      properties: 38,
      averagePrice: 'R$ 750k',
      features: ['Área verde', 'Família', 'Tranquilidade'],
      color: '#7c3aed',
      coordinates: '320,220 400,200 420,270 350,290 310,250',
      center: { x: 365, y: 245 }
    }
  ];

  const handleRegionClick = (regionId) => {
    setSelectedRegion(regionId);
    setFilters({ location: regionId });
    
    // Scroll para seção de propriedades
    setTimeout(() => {
      document.getElementById('properties')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 300);
  };

  const getRegionStyle = (region) => {
    const isHovered = hoveredRegion === region.id;
    const isSelected = selectedRegion === region.id;
    
    return {
      fill: isSelected ? region.color : isHovered ? region.color : `${region.color}80`,
      stroke: isSelected || isHovered ? '#ffffff' : region.color,
      strokeWidth: isSelected || isHovered ? '3' : '1',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    };
  };

  return (
    <section 
      id="regions" 
      ref={ref}
      className="py-16 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          hasIntersected ? 'animate-fadeIn' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Explore Nossas <span className="text-primary-blue">Regiões</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubra as melhores áreas da cidade e encontre seu lugar ideal
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mapa SVG */}
            <div className={`transition-all duration-1000 delay-200 ${
              hasIntersected ? 'animate-slideInLeft' : 'opacity-0 translate-x-10'
            }`}>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Mapa Interativo
                </h3>
                
                <div className="relative">
                  <svg
                    viewBox="0 0 500 350"
                    className="w-full h-auto"
                    style={{ maxHeight: '400px' }}
                  >
                    {/* Fundo do mapa */}
                    <rect width="500" height="350" fill="#e0f2fe" rx="10" />
                    
                    {/* Oceano */}
                    <path
                      d="M0,200 Q100,180 200,200 T400,220 L500,250 L500,350 L0,350 Z"
                      fill="#0ea5e9"
                      opacity="0.6"
                    />
                    
                    {/* Regiões */}
                    {regions.map((region) => (
                      <g key={region.id}>
                        <polygon
                          points={region.coordinates}
                          style={getRegionStyle(region)}
                          onMouseEnter={() => setHoveredRegion(region.id)}
                          onMouseLeave={() => setHoveredRegion(null)}
                          onClick={() => handleRegionClick(region.id)}
                        />
                        
                        {/* Label da região */}
                        <text
                          x={region.center.x}
                          y={region.center.y}
                          textAnchor="middle"
                          className="fill-white font-semibold text-sm pointer-events-none"
                          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                        >
                          {region.name}
                        </text>
                        
                        {/* Ícone de localização */}
                        <circle
                          cx={region.center.x}
                          cy={region.center.y + 15}
                          r="3"
                          fill="white"
                          className="pointer-events-none"
                        />
                      </g>
                    ))}
                    
                    {/* Legenda */}
                    <g transform="translate(20, 20)">
                      <rect width="120" height="80" fill="white" fillOpacity="0.9" rx="5" />
                      <text x="10" y="20" className="fill-gray-800 font-semibold text-xs">
                        Legenda:
                      </text>
                      <text x="10" y="35" className="fill-gray-600 text-xs">
                        Clique para filtrar
                      </text>
                      <text x="10" y="50" className="fill-gray-600 text-xs">
                        Hover para detalhes
                      </text>
                      <circle cx="15" cy="65" r="3" fill="#0ea5e9" />
                      <text x="25" y="70" className="fill-gray-600 text-xs">Oceano</text>
                    </g>
                  </svg>

                  {/* Card de informações da região hover */}
                  {hoveredRegion && (
                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 min-w-[200px] z-10 animate-scaleIn">
                      {(() => {
                        const region = regions.find(r => r.id === hoveredRegion);
                        return (
                          <div>
                            <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                              <FaMapMarkerAlt className="mr-2 text-primary-blue" />
                              {region.name}
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-gray-600">
                                  <FaHome className="mr-1" />
                                  Imóveis:
                                </span>
                                <span className="font-semibold">{region.properties}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-gray-600">
                                  <FaDollarSign className="mr-1" />
                                  Preço médio:
                                </span>
                                <span className="font-semibold text-primary-blue">
                                  {region.averagePrice}
                                </span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-xs text-gray-500 mb-1">Características:</p>
                              <div className="flex flex-wrap gap-1">
                                {region.features.map((feature, index) => (
                                  <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Lista de Regiões */}
            <div className={`transition-all duration-1000 delay-400 ${
              hasIntersected ? 'animate-slideInRight' : 'opacity-0 translate-x-10'
            }`}>
              <div className="space-y-6">
                {regions.map((region, index) => (
                  <div
                    key={region.id}
                    className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      selectedRegion === region.id ? 'ring-2 ring-primary-blue bg-blue-50' : ''
                    }`}
                    onClick={() => handleRegionClick(region.id)}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: region.color }}
                        />
                        {region.name}
                      </h3>
                      <span className="text-2xl font-bold text-primary-blue">
                        {region.averagePrice}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-gray-600">
                          <FaHome className="mr-2" />
                          Imóveis disponíveis
                        </span>
                        <span className="font-semibold bg-primary-blue text-white px-3 py-1 rounded-full text-sm">
                          {region.properties}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {region.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full mt-4 bg-gradient-to-r from-primary-blue to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                      Ver Imóveis desta Região
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas Gerais */}
        <div className={`mt-16 transition-all duration-1000 delay-600 ${
          hasIntersected ? 'animate-fadeIn' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Estatísticas Gerais
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-blue mb-2">
                  {regions.reduce((sum, region) => sum + region.properties, 0)}
                </div>
                <div className="text-gray-600">Imóveis Totais</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-blue mb-2">
                  {regions.length}
                </div>
                <div className="text-gray-600">Regiões Atendidas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-blue mb-2">
                  95%
                </div>
                <div className="text-gray-600">Taxa de Vendas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-blue mb-2">
                  15%
                </div>
                <div className="text-gray-600">Valorização/Ano</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

RegionsMap.propTypes = {};

export default RegionsMap;
