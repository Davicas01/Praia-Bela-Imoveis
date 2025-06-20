import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  FaChevronLeft, 
  FaChevronRight,
  FaBed,
  FaBath,
  FaCar,
  FaCompressArrowsAlt,
  FaHeart,
  FaRegHeart,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaStar
} from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import PropertyDetailsModal from './PropertyDetailsModal';

function FeaturedCarousel() {
  const { 
    properties, 
    favorites, 
    addToFavorites, 
    removeFromFavorites 
  } = useAppContext();

  // Filtrar apenas imóveis em destaque
  const featuredProperties = properties.filter(property => property.featured);
    const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [detailsModal, setDetailsModal] = useState({
    isOpen: false,
    property: null
  });
  const [visibleCards, setVisibleCards] = useState(3);

  // Responsividade - ajustar quantidade de cards visíveis
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Auto-rotação
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, visibleCards]);

  const handleNext = () => {
    setCurrentIndex(prev => {
      const maxIndex = Math.max(0, featuredProperties.length - visibleCards);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const maxIndex = Math.max(0, featuredProperties.length - visibleCards);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const handleFavoriteToggle = (propertyId) => {
    if (favorites.includes(propertyId)) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(propertyId);
    }
  };
  const handleWhatsApp = (property) => {
    const message = `Olá! Tenho interesse no imóvel: ${property.title} - ${property.priceFormatted}`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleViewDetails = (property) => {
    setDetailsModal({
      isOpen: true,
      property
    });
  };

  if (featuredProperties.length === 0) {
    return null;
  }
  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden relative">
      {/* Elementos decorativos */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-blue/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-gold/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho melhorado */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-primary-blue/10 to-blue-600/10 text-primary-blue px-8 py-3 rounded-full text-sm font-bold mb-8">
            <FaStar className="mr-3 text-primary-gold" />
            IMÓVEIS PREMIUM EM DESTAQUE
          </div>
          <h2 className="text-6xl md:text-7xl font-black text-gray-800 mb-8 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue via-blue-600 to-blue-800">
              Seleção
            </span>{' '}
            <span className="text-gray-800">Exclusiva</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Descubra nossa curadoria especial dos imóveis mais desejados e exclusivos do mercado
          </p>
        </div>

        {/* Carrossel */}
        <div className="relative">
          {/* Container do Carrossel */}
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` 
              }}
            >
              {featuredProperties.map((property) => (
                <div
                  key={property.id}
                  className={`flex-shrink-0 px-3`}
                  style={{ width: `${100 / visibleCards}%` }}
                >                  <PropertyCard
                    property={property}
                    onFavoriteToggle={handleFavoriteToggle}
                    onWhatsApp={handleWhatsApp}
                    onViewDetails={handleViewDetails}
                    isFavorite={favorites.includes(property.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Controles de navegação */}
          {featuredProperties.length > visibleCards && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white text-primary-blue p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 group"
                aria-label="Imóvel anterior"
              >
                <FaChevronLeft className="text-xl group-hover:scale-110 transition-transform duration-300" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white text-primary-blue p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 group"
                aria-label="Próximo imóvel"
              >
                <FaChevronRight className="text-xl group-hover:scale-110 transition-transform duration-300" />
              </button>
            </>
          )}
        </div>

        {/* Indicadores */}
        {featuredProperties.length > visibleCards && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.max(1, featuredProperties.length - visibleCards + 1) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-blue scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              document.getElementById('properties')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
            className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Ver Todos os Imóveis
          </button>        </div>
      </div>

      {/* Modal de Detalhes */}
      <PropertyDetailsModal
        isOpen={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false, property: null })}
        property={detailsModal.property}
      />
    </section>
  );
}

// Componente do Card de Propriedade
function PropertyCard({ property, onFavoriteToggle, onWhatsApp, onViewDetails, isFavorite }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-1">
      {/* Imagem */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={`${property.images[currentImageIndex]}?w=400&h=300&fit=crop`}
          alt={property.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />

        {/* Overlay com gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Badge de Destaque */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
            DESTAQUE
          </span>
        </div>

        {/* Favoritar */}
        <button
          onClick={() => onFavoriteToggle(property.id)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 group/fav"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 group-hover/fav:scale-110 transition-transform duration-300" />
          ) : (
            <FaRegHeart className="text-gray-600 group-hover/fav:text-red-500 group-hover/fav:scale-110 transition-all duration-300" />
          )}
        </button>

        {/* Navegação de imagens */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-4 right-4 flex items-center bg-black/50 rounded-full px-2 py-1 text-white text-xs">
          <FaStar className="text-yellow-400 mr-1" />
          {property.rating}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        {/* Preço e Localização */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-blue transition-colors duration-300 line-clamp-1">
              {property.title}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-blue">
              {property.priceFormatted}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <FaMapMarkerAlt className="mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <FaBed className="text-primary-blue" />
            <span>{property.bedrooms} quartos</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaBath className="text-primary-blue" />
            <span>{property.bathrooms} banheiros</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCompressArrowsAlt className="text-primary-blue" />
            <span>{property.area}m²</span>
          </div>
          <div className="flex items-center space-x-2">
            {property.garage ? (
              <>
                <FaCar className="text-green-600" />
                <span className="text-green-600">Garagem</span>
              </>
            ) : (
              <>
                <FaCar className="text-gray-400" />
                <span className="text-gray-400">Sem garagem</span>
              </>
            )}
          </div>
        </div>

        {/* Descrição */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>        {/* Botões de Ação */}
        <div className="flex space-x-2">
          <button 
            onClick={() => onViewDetails(property)}
            className="flex-1 bg-gradient-to-r from-primary-blue to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm transform hover:scale-105"
          >
            Ver Detalhes
          </button>
          <button
            onClick={() => onWhatsApp(property)}
            className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors duration-300 transform hover:scale-105"
          >
            <FaWhatsapp />
          </button>
        </div>
      </div>
    </div>
  );
}

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  onWhatsApp: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired
};

FeaturedCarousel.propTypes = {};

export default FeaturedCarousel;
