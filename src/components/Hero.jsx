import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaSearch, 
  FaMapMarkerAlt, 
  FaHome, 
  FaDollarSign 
} from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import { useCarousel } from '../hooks';

function Hero() {
  const { setFilters, setUIState } = useAppContext();
  
  // Imagens do carrossel
  const heroImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Casa de Luxo Vista Mar",
      subtitle: "Encontre o imóvel dos seus sonhos à beira-mar"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Apartamentos Modernos",
      subtitle: "Vida urbana com todo conforto e sofisticação"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Coberturas Premium",
      subtitle: "O máximo em elegância e exclusividade"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Villas Exclusivas",
      subtitle: "Propriedades únicas para clientes exigentes"
    }
  ];

  // Carousel hook
  const { 
    currentIndex, 
    next, 
    prev, 
    goTo, 
    pause, 
    play 
  } = useCarousel(heroImages, {
    autoPlay: true,
    interval: 5000,
    loop: true
  });

  // Estados do formulário de busca
  const [searchForm, setSearchForm] = useState({
    location: '',
    type: '',
    priceRange: ''
  });

  const handleSearchChange = (field, value) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters(searchForm);
    setUIState({ loading: true });
    
    // Scroll para seção de propriedades
    setTimeout(() => {
      document.getElementById('properties')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setUIState({ loading: false });
    }, 500);
  };

  const currentImage = heroImages[currentIndex];

  return (
    <section 
      id="home" 
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"
      onMouseEnter={pause}
      onMouseLeave={play}
    >
      {/* Carrossel de Imagens com Ken Burns Effect */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentIndex 
                ? 'opacity-60 scale-105' 
                : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animation: index === currentIndex ? 'kenBurns 5s ease-in-out infinite alternate' : 'none'
            }}
          />
        ))}
        
        {/* Overlay com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      </div>

      {/* Navegação do Carrossel */}
      <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
        <button
          onClick={prev}
          className="pointer-events-auto group p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
          aria-label="Imagem anterior"
        >
          <FaChevronLeft className="text-white text-xl group-hover:text-primary-gold transition-colors duration-300" />
        </button>
        
        <button
          onClick={next}
          className="pointer-events-auto group p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
          aria-label="Próxima imagem"
        >
          <FaChevronRight className="text-white text-xl group-hover:text-primary-gold transition-colors duration-300" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary-gold scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Título Principal com Parallax */}
            <div 
              className="mb-8 transform transition-all duration-1000"
              style={{
                transform: `translateY(${currentIndex * -10}px)`
              }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-primary-gold animate-slideInLeft">
                  {currentImage.title}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed animate-slideInRight">
                {currentImage.subtitle}
              </p>
            </div>

            {/* Formulário de Busca Rápida */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto animate-scaleIn">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Busca Rápida
              </h3>
              
              <form onSubmit={handleSearchSubmit} className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-4">
                {/* Localização */}
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={searchForm.location}
                    onChange={(e) => handleSearchChange('location', e.target.value)}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-700 bg-white"
                  >
                    <option value="">Localização</option>
                    <option value="praia-bela">Praia Bela</option>
                    <option value="centro">Centro</option>
                    <option value="beira-mar">Beira Mar</option>
                  </select>
                </div>

                {/* Tipo de Imóvel */}
                <div className="relative">
                  <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={searchForm.type}
                    onChange={(e) => handleSearchChange('type', e.target.value)}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-700 bg-white"
                  >
                    <option value="">Tipo</option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="cobertura">Cobertura</option>
                  </select>
                </div>

                {/* Faixa de Preço */}
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={searchForm.priceRange}
                    onChange={(e) => handleSearchChange('priceRange', e.target.value)}
                    className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-700 bg-white"
                  >
                    <option value="">Preço</option>
                    <option value="ate-500k">Até R$ 500k</option>
                    <option value="500k-1m">R$ 500k - R$ 1M</option>
                    <option value="acima-1m">Acima de R$ 1M</option>
                  </select>
                </div>

                {/* Botão de Busca */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-blue to-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <FaSearch />
                  <span>Buscar</span>
                </button>
              </form>

              {/* Estatísticas Rápidas */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-blue">150+</div>
                  <div className="text-sm text-gray-600">Imóveis</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-blue">98%</div>
                  <div className="text-sm text-gray-600">Satisfação</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-blue">15+</div>
                  <div className="text-sm text-gray-600">Anos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {};

export default Hero;
