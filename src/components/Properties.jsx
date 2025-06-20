import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { 
  FaBed, 
  FaBath, 
  FaCar, 
  FaSwimmingPool, 
  FaHome, 
  FaHeart, 
  FaRegHeart, 
  FaCompressArrowsAlt, 
  FaEye, 
  FaStar,
  FaWhatsapp,
  FaExpand,
  FaFilter,
  FaSort,
  FaTimes,
  FaBalanceScale
} from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import { useIntersectionObserver, useModal } from '../hooks';

// Componente de Loading Skeleton
function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="flex space-x-4 mb-4">
          <div className="h-4 bg-gray-300 rounded flex-1"></div>
          <div className="h-4 bg-gray-300 rounded flex-1"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

// Modal de Imagens
function ImageModal({ isOpen, onClose, images, currentIndex, setCurrentIndex, title }) {
  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl p-2 hover:bg-white/20 rounded-full transition-colors duration-300"
      >
        <FaTimes />
      </button>
      
      <div className="max-w-4xl w-full">
        <img
          src={`${images[currentIndex]}?w=800&h=600&fit=crop`}
          alt={title}
          className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
        />
        
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl p-2 hover:bg-white/20 rounded-full transition-colors duration-300"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl p-2 hover:bg-white/20 rounded-full transition-colors duration-300"
            >
              →
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Componente de Card de Propriedade
function PropertyCard({ property, onImageClick, onFavoriteToggle, onComparisonToggle, isFavorite, isInComparison }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleWhatsApp = () => {
    const message = `Olá! Tenho interesse no imóvel: ${property.title} - ${property.priceFormatted}`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover-lift">
      {/* Imagem Principal */}
      <div className="relative h-64 overflow-hidden">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        )}
        
        <img
          src={`${property.images[imageIndex]}?w=400&h=300&fit=crop`}
          alt={property.title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsImageLoading(false)}
          onClick={() => onImageClick(property.images, imageIndex)}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {property.featured && (
            <span className="bg-primary-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
              Destaque
            </span>
          )}
          <span className="bg-primary-blue text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
            {property.type}
          </span>
        </div>

        {/* Ações */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => onFavoriteToggle(property.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
          
          <button
            onClick={() => onComparisonToggle(property.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isInComparison 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white'
            }`}
            disabled={!isInComparison && onComparisonToggle.length >= 3}
          >
            <FaBalanceScale />
          </button>

          <button
            onClick={() => onImageClick(property.images, imageIndex)}
            className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white hover:text-gray-800 backdrop-blur-sm transition-all duration-300"
          >
            <FaExpand />
          </button>
        </div>

        {/* Indicadores de Imagem */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === imageIndex ? 'bg-white scale-125' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Rating e Views */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <div className="flex items-center bg-black/50 rounded-full px-2 py-1 text-white text-xs">
            <FaStar className="text-yellow-400 mr-1" />
            {property.rating}
          </div>
          <div className="flex items-center bg-black/50 rounded-full px-2 py-1 text-white text-xs">
            <FaEye className="mr-1" />
            {property.views}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        {/* Título e Preço */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-blue transition-colors duration-300">
            {property.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-blue">
              {property.priceFormatted}
            </span>
            <span className="text-sm text-gray-500">{property.location}</span>
          </div>
        </div>

        {/* Características */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
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
                <span>Garagem</span>
              </>
            ) : (
              <>
                <FaCar className="text-gray-400" />
                <span className="text-gray-400">Sem garagem</span>
              </>
            )}
          </div>
        </div>

        {/* Features Extras */}
        <div className="flex flex-wrap gap-2 mb-4">
          {property.pool && (
            <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              <FaSwimmingPool className="mr-1" />
              Piscina
            </span>
          )}
          {property.furnished && (
            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              <FaHome className="mr-1" />
              Mobiliado
            </span>
          )}
          {property.balcony && (
            <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              Varanda
            </span>
          )}
        </div>

        {/* Descrição */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Botões de Ação */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-gradient-to-r from-primary-blue to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm">
            Ver Detalhes
          </button>
          <button
            onClick={handleWhatsApp}
            className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
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
  onImageClick: PropTypes.func.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  onComparisonToggle: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isInComparison: PropTypes.bool.isRequired
};

// Componente Principal
function Properties({ showFiltersBelow = false, maxProperties = null, showAll = false }) {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const { 
    filters, 
    favorites, 
    comparison,
    getFilteredProperties,
    addToFavorites,
    removeFromFavorites,
    addToComparison,
    removeFromComparison,
    setFilters
  } = useAppContext();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [imageModal, setImageModal] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: ''
  });

  // Filtrar e ordenar propriedades
  const filteredAndSortedProperties = useMemo(() => {
    let properties = getFilteredProperties();
    
    // Ordenação
    switch (sortBy) {
      case 'price-asc':
        properties.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        properties.sort((a, b) => b.price - a.price);
        break;
      case 'area-desc':
        properties.sort((a, b) => b.area - a.area);
        break;
      case 'newest':
        properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'featured':
      default:
        properties.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    return properties;
  }, [getFilteredProperties, sortBy]);

  const handleImageClick = (images, index) => {
    setImageModal({
      isOpen: true,
      images,
      currentIndex: index,
      title: 'Galeria de Imagens'
    });
  };

  const handleFavoriteToggle = (propertyId) => {
    if (favorites.includes(propertyId)) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(propertyId);
    }
  };

  const handleComparisonToggle = (propertyId) => {
    if (comparison.includes(propertyId)) {
      removeFromComparison(propertyId);
    } else if (comparison.length < 3) {
      addToComparison(propertyId);
    }
  };

  return (
    <section id="properties" ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Cabeçalho */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          hasIntersected ? 'animate-fadeIn' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nossos <span className="text-primary-blue">Imóveis</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre o imóvel perfeito para você com nossas opções exclusivas
          </p>
        </div>

        {/* Controles */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          {/* Filtros */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FaFilter />
              <span>Filtros</span>
            </button>
            
            {/* Contador de resultados */}
            <span className="text-gray-600">
              {filteredAndSortedProperties.length} imóveis encontrados
            </span>
          </div>

          {/* Ordenação */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaSort />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              >
                <option value="featured">Destaques</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="area-desc">Maior Área</option>
                <option value="newest">Mais Recentes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Painel de Filtros */}
        {isFilterOpen && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Quartos */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quartos
                </label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ bedrooms: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                >
                  <option value="">Todos</option>
                  <option value="1">1 quarto</option>
                  <option value="2">2 quartos</option>
                  <option value="3">3 quartos</option>
                  <option value="4">4+ quartos</option>
                </select>
              </div>

              {/* Garagem */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Garagem
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.garage}
                    onChange={(e) => setFilters({ garage: e.target.checked })}
                    className="rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                  />
                  <span className="ml-2 text-sm">Com garagem</span>
                </label>
              </div>

              {/* Piscina */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Piscina
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.pool}
                    onChange={(e) => setFilters({ pool: e.target.checked })}
                    className="rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                  />
                  <span className="ml-2 text-sm">Com piscina</span>
                </label>
              </div>

              {/* Mobiliado */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobília
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.furnished}
                    onChange={(e) => setFilters({ furnished: e.target.checked })}
                    className="rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                  />
                  <span className="ml-2 text-sm">Mobiliado</span>
                </label>
              </div>

              {/* Varanda */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Varanda
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.balcony}
                    onChange={(e) => setFilters({ balcony: e.target.checked })}
                    className="rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                  />
                  <span className="ml-2 text-sm">Com varanda</span>
                </label>
              </div>

              {/* Área */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Área (m²)
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={filters.area.min}
                    onChange={(e) => setFilters({ 
                      area: { ...filters.area, min: parseInt(e.target.value) } 
                    })}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-600">
                    {filters.area.min}m² - {filters.area.max}m²
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid de Propriedades */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hasIntersected ? (
            filteredAndSortedProperties.map((property, index) => (
              <div
                key={property.id}
                className={`transition-all duration-1000 ${
                  hasIntersected 
                    ? 'animate-fadeIn' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PropertyCard
                  property={property}
                  onImageClick={handleImageClick}
                  onFavoriteToggle={handleFavoriteToggle}
                  onComparisonToggle={handleComparisonToggle}
                  isFavorite={favorites.includes(property.id)}
                  isInComparison={comparison.includes(property.id)}
                />
              </div>
            ))
          ) : (
            // Skeleton loading
            Array.from({ length: 6 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))
          )}
        </div>

        {/* Sem resultados */}
        {filteredAndSortedProperties.length === 0 && hasIntersected && (
          <div className="text-center py-12">
            <div className="text-6xl text-gray-300 mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-gray-500 mb-4">
              Tente ajustar os filtros para encontrar mais opções
            </p>
            <button
              onClick={() => setFilters({})}
              className="bg-primary-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Modal de Imagens */}
      <ImageModal
        isOpen={imageModal.isOpen}
        onClose={() => setImageModal({ ...imageModal, isOpen: false })}
        images={imageModal.images}
        currentIndex={imageModal.currentIndex}
        setCurrentIndex={(index) => setImageModal({ ...imageModal, currentIndex: index })}
        title={imageModal.title}
      />
    </section>
  );
}

Properties.propTypes = {
  showFiltersBelow: PropTypes.bool,
  maxProperties: PropTypes.number,
  showAll: PropTypes.bool
};

export default Properties;
