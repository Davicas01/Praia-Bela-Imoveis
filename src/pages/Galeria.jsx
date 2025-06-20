import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaFilter, FaTh, FaExpand, FaHeart, FaRegHeart, FaEye, FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

// Modal de Imagem Fullscreen
function ImageModal({ isOpen, onClose, image, property }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl p-3 hover:bg-white/20 rounded-full transition-colors duration-300 z-10"
      >
        <FaTimes />
      </button>
      
      <div className="max-w-6xl w-full">
        <img
          src={`${image}?w=1200&h=800&fit=crop`}
          alt={property?.title}
          className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
        />
        
        {property && (
          <div className="mt-4 text-center">
            <h3 className="text-white text-xl font-bold">{property.title}</h3>
            <p className="text-gray-300">{property.priceFormatted} • {property.location}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Card de Imagem da Galeria
function GalleryImageCard({ image, property, index, onImageClick, onToggleFavorite, isFavorite }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-200 aspect-square hover:scale-105 transition-all duration-300 cursor-pointer">
      {/* Shimmer Loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
      )}
      
      <img
        src={`${image}?w=400&h=400&fit=crop`}
        alt={`${property.title} - Foto ${index + 1}`}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onClick={() => onImageClick(image, property)}
      />

      {/* Overlay com informações */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h4 className="text-white font-semibold text-sm mb-1 truncate">{property.title}</h4>
          <p className="text-gray-200 text-xs">{property.priceFormatted}</p>
        </div>
      </div>

      {/* Ações no hover */}
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
        
        <button
          onClick={() => onImageClick(image, property)}
          className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-primary-blue hover:text-white backdrop-blur-sm transition-all duration-300"
        >
          <FaExpand />
        </button>
      </div>

      {/* Badge do tipo */}
      <div className="absolute top-2 left-2">
        <span className="bg-primary-blue text-white px-2 py-1 rounded text-xs font-medium capitalize">
          {property.type}
        </span>
      </div>
    </div>
  );
}

function Galeria() {
  const { state, toggleFavorite } = useAppContext();
  const { properties, favorites } = state;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('masonry'); // masonry ou grid
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Gerar todas as imagens com suas propriedades
  const allImages = useMemo(() => {
    const images = [];
    properties.forEach(property => {
      property.images.forEach((image, index) => {
        images.push({
          id: `${property.id}-${index}`,
          image,
          property,
          imageIndex: index
        });
      });
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
  const propertyTypes = [...new Set(properties.map(p => p.type))];

  const handleImageClick = (image, property) => {
    setSelectedImage(image);
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleToggleFavorite = (propertyId) => {
    toggleFavorite(propertyId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header da Galeria */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Galeria de <span className="text-primary-blue">Imóveis</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore nossa coleção completa de imóveis premium através de uma experiência visual imersiva
          </p>
        </div>

        {/* Controles de Busca e Filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Busca */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou localização..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>

            {/* Filtro por Tipo */}
            <div className="flex items-center space-x-4">
              <FaFilter className="text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              >
                <option value="all">Todos os Tipos</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type} className="capitalize">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Modo de Visualização */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'masonry' 
                    ? 'bg-primary-blue text-white' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FaTh />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-blue text-white' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FaTh />
              </button>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>{filteredImages.length} imagens encontradas</span>
            <span>{properties.length} propriedades • {allImages.length} fotos total</span>
          </div>
        </div>

        {/* Galeria de Imagens */}
        <div className={`${
          viewMode === 'masonry' 
            ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4' 
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
        }`}>
          {filteredImages.map((item, index) => (
            <div key={item.id} className={viewMode === 'masonry' ? 'break-inside-avoid mb-4' : ''}>
              <GalleryImageCard
                image={item.image}
                property={item.property}
                index={item.imageIndex}
                onImageClick={handleImageClick}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(item.property.id)}
              />
            </div>
          ))}
        </div>

        {/* Mensagem de nenhum resultado */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma imagem encontrada
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou termos de busca
            </p>
          </div>
        )}
      </div>

      {/* Modal de Imagem */}
      <ImageModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        image={selectedImage}
        property={selectedProperty}
      />
    </div>
  );
}

export default Galeria;
