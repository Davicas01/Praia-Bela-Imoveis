import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaFilter, FaTh, FaExpand, FaHeart, FaRegHeart, FaEye, FaTimes, FaThLarge, FaThList } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

// Modal de Imagem Fullscreen melhorado
function ImageModal({ isOpen, onClose, image, property }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl p-3 hover:bg-white/20 rounded-full transition-all duration-300 z-10 transform hover:scale-110"
      >
        <FaTimes />
      </button>
      
      <div className="max-w-6xl w-full animate-fadeIn">
        <img
          src={`${image}?w=1200&h=800&fit=crop`}
          alt={property?.title}
          className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        />
        
        {property && (
          <div className="mt-8 text-center bg-black/50 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-white text-2xl font-bold mb-2">{property.title}</h3>
            <p className="text-gray-300 text-lg">{property.priceFormatted} • {property.location}</p>
            <div className="flex items-center justify-center space-x-6 mt-4 text-gray-400">
              <span>{property.bedrooms} quartos</span>
              <span>{property.bathrooms} banheiros</span>
              <span>{property.area}m²</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Card de Imagem da Galeria aprimorado
function GalleryImageCard({ image, property, index, onImageClick, onToggleFavorite, isFavorite }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const cardElement = document.getElementById(`gallery-card-${property.id}-${index}`);
    if (cardElement) {
      observer.observe(cardElement);
    }

    return () => observer.disconnect();
  }, [property.id, index]);

  return (
    <div 
      id={`gallery-card-${property.id}-${index}`}
      className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-square hover:scale-105 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl"
      onClick={() => onImageClick(image, property)}
    >
      {/* Shimmer Loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
      )}
      
      {isVisible && (
        <img
          src={`${image}?w=400&h=400&fit=crop`}
          alt={`${property.title} - Foto ${index + 1}`}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      )}

      {/* Overlay com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* Informações do imóvel */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h4 className="text-white font-bold text-base mb-1 truncate">{property.title}</h4>
        <p className="text-gray-200 text-sm">{property.priceFormatted}</p>
        <p className="text-gray-300 text-xs">{property.location}</p>
      </div>

      {/* Ações no hover */}
      <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
            isFavorite 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onImageClick(image, property);
          }}
          className="p-2 rounded-full bg-white/90 text-gray-600 hover:bg-primary-blue hover:text-white backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
        >
          <FaExpand />
        </button>
      </div>

      {/* Badge do tipo */}
      <div className="absolute top-3 left-3">
        <span className="bg-primary-blue text-white px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-lg">
          {property.type}
        </span>
      </div>

      {/* Badge featured */}
      {property.featured && (
        <div className="absolute top-12 left-3">
          <span className="bg-primary-gold text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Destaque
          </span>
        </div>
      )}
    </div>
  );
}

function Galeria() {
  const { 
    properties, 
    favorites, 
    addToFavorites, 
    removeFromFavorites 
  } = useAppContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('masonry');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Gerar todas as imagens com suas propriedades
  const allImages = useMemo(() => {
    if (!properties || properties.length === 0) return [];
    
    const images = [];
    properties.forEach(property => {
      if (property.images && property.images.length > 0) {
        property.images.forEach((image, index) => {
          images.push({
            id: `${property.id}-${index}`,
            image,
            property,
            imageIndex: index
          });
        });
      }
    });
    return images;
  }, [properties]);

  // Filtrar imagens
  const filteredImages = useMemo(() => {
    return allImages.filter(item => {
      const matchesSearch = item.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || item.property.type === selectedType;
      
      return matchesSearch && matchesType;
    });
  }, [allImages, searchTerm, selectedType]);

  // Tipos únicos para filtro
  const propertyTypes = useMemo(() => {
    if (!properties || properties.length === 0) return [];
    return [...new Set(properties.map(p => p.type))];
  }, [properties]);

  const handleImageClick = (image, property) => {
    setSelectedImage(image);
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleToggleFavorite = (propertyId) => {
    if (favorites.includes(propertyId)) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(propertyId);
    }
  };

  if (!properties || properties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-300 mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Carregando Galeria...</h2>
          <p className="text-gray-500">Aguarde enquanto carregamos os imóveis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header da Galeria melhorado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary-blue/10 text-primary-blue px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <FaThLarge className="mr-2" />
            Galeria Completa
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Galeria de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-blue-600">Imóveis</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore nossa coleção completa de imóveis premium através de uma experiência visual imersiva e interativa
          </p>
        </div>

        {/* Controles de Busca e Filtros aprimorados */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou localização..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>

            {/* Filtro por Tipo */}
            <div className="flex items-center space-x-4">
              <FaFilter className="text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent bg-gray-50 hover:bg-white transition-all duration-300"
              >
                <option value="all">Todos os tipos</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type} className="capitalize">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Modo de visualização */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'masonry' 
                    ? 'bg-primary-blue text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FaTh />
              </button>              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-blue text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FaThList />
              </button>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-600 pt-6 border-t border-gray-100">
            <span className="font-medium">{filteredImages.length} imagens encontradas</span>
            <span>{propertyTypes.length} tipos de imóveis</span>
          </div>
        </div>

        {/* Grid de Imagens */}
        {filteredImages.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'masonry' 
              ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          }`}>
            {filteredImages.map((item, index) => (
              <GalleryImageCard
                key={item.id}
                image={item.image}
                property={item.property}
                index={item.imageIndex}
                onImageClick={handleImageClick}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(item.property.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              Nenhuma imagem encontrada
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros de busca para encontrar mais resultados
            </p>
          </div>
        )}

        {/* Modal de Imagem */}
        <ImageModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          image={selectedImage}
          property={selectedProperty}
        />
      </div>
    </div>
  );
}

export default Galeria;
